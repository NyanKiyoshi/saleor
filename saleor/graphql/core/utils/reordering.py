from collections import OrderedDict
from dataclasses import dataclass
from typing import Dict, Tuple

import graphene
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import F, QuerySet
from django.utils.functional import cached_property

__all__ = ["perform_reordering"]


@dataclass(frozen=True)
class FinalSortOrder:
    """Describes a final sort order value for a given PK. This is needed to tell django
    which objects and values to associate and update."""

    pk: int
    sort_order: int


class NoChangeException(Exception):
    pass


class Reordering:
    def __init__(
        self, qs: QuerySet, model_name: str, operations: Dict[int, int], field: str
    ):
        self.qs = qs
        self.model_name = model_name
        self.operations = operations
        self.field = field

        # Will contain the original data, before sorting
        # This will be useful to look for the sort orders that
        # actually were changed
        self.old_sort_map = {}

        # Will contain the list of keys kept
        # in correct order in accordance to their sort order
        self.ordered_pks = []

    @cached_property
    def ordered_node_map(self):
        ordering_map = OrderedDict(
            self.qs.select_for_update()
            .values_list("pk", "sort_order")
            .order_by(F("sort_order").asc(nulls_last=True), "id")
        )
        self.old_sort_map = ordering_map.copy()
        self.ordered_pks = list(ordering_map.keys())

        previous_sort_order = 0

        # Add sort order to null values
        for pk, sort_order in ordering_map.items():
            if sort_order is not None:
                previous_sort_order = sort_order
                continue

            previous_sort_order += 1
            ordering_map[pk] = previous_sort_order

        return ordering_map

    def resolve_node_from_global_id(self, global_id: str) -> int:
        internal_type, _id = graphene.Node.from_global_id(global_id)  # type: str, str

        # Ensure the type is the expected one and the id is not garbage
        if internal_type == self.model_name and _id.isnumeric():
            pk = int(_id)

            # Check if it exists
            if pk in self.ordered_node_map:
                return pk

        # Raise a validation error if we failed to resolve the passed node
        raise ValidationError(
            {"moves": f"Couldn't resolve {global_id} to {self.model_name}"}
        )

    def calculate_new_sort_order(self, pk, move) -> Tuple[int, int, int]:
        """Returns the proper sort order for the current operation to properly
        move the node in a given direction with by amount.

        This ensures the new sort order is not biased from gaps between
        the sort orders."""

        # Skip if we don't have to move it
        if move == 0:
            raise NoChangeException(pk, move)

        # Retrieve the position of the node to move
        node_pos = self.ordered_pks.index(pk)

        # Set the target position from the current position
        # of the node + the relative position to move from
        target_pos = node_pos + move

        # Make sure we are not getting out of bounds
        target_pos = max(0, target_pos)
        target_pos = min(len(self.ordered_pks) - 1, target_pos)

        # Retrieve the target node and its sort order
        target_pk = self.ordered_pks[target_pos]
        target_position = self.ordered_node_map[target_pk]

        # Return the new position
        return node_pos, target_pos, target_position

    def process_move_operation(self, pk, move):
        old_sort_order = self.ordered_node_map[pk]

        try:
            node_pos, target_pos, new_sort_order = self.calculate_new_sort_order(
                pk, move
            )
        except NoChangeException:
            # Skip if noting to do
            return

        # Determine how we should shift for this operation
        if move > 0:
            shift = -1
            range_ = old_sort_order + 1, new_sort_order
        else:
            shift = +1
            range_ = new_sort_order, old_sort_order - 1

        # Shift the sort orders within the moving range
        self.add_to_sort_value_if_in_range(shift, *range_)

        # Update the sort order of the node to move
        self.ordered_node_map[pk] = new_sort_order

        # Reorder the pk list
        self.ordered_pks.remove(pk)
        self.ordered_pks.insert(target_pos, pk)

    def add_to_sort_value_if_in_range(self, value_to_add, start, end):
        for pk, sort_order in self.ordered_node_map.items():
            if not start <= sort_order <= end:
                continue

            self.ordered_node_map[pk] += value_to_add

    def commit(self):
        # Do nothing if nothing was done
        if not self.old_sort_map:
            return

        # Create the bulk update to run
        # But only if data was changed
        batch = [
            FinalSortOrder(pk, sort_order)
            for pk, sort_order in self.ordered_node_map.items()
            if sort_order != self.old_sort_map[pk]
        ]

        # Do not update if nothing changed
        if not batch:
            return

        # Update everything that was changed
        self.qs.model.objects.bulk_update(batch, ["sort_order"])

    def run(self):

        for pk, move in self.operations.items():
            # Skip operation if it was deleted in concurrence
            if pk not in self.ordered_node_map:
                continue

            self.process_move_operation(pk, move)

        self.commit()


def perform_reordering(
    qs: QuerySet, operations: Dict[int, int], field: str = "moves", model_name=None
):
    """This utility takes a set of operations containing a node
    and a relative sort order. It then converts the relative sorting
    to an absolute sorting.

    This will then commit the changes onto the nodes.

    :param qs: The query set on which we want to retrieve and reorder the node.
    :param operations: The operations to make: {pk_to_move: +/- 123}.
    :param field: The field from which nodes are resolved.

    :raises RuntimeError: If the bulk operation is not run inside an atomic transaction.
    """

    if not transaction.get_connection().in_atomic_block:
        raise RuntimeError("Needs to be run inside an atomic transaction")

    if model_name is None:
        model_name = qs.model.__name__
    else:
        model_name = model_name

    Reordering(qs, model_name, operations, field).run()
