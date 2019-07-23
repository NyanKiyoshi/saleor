from collections import OrderedDict
from typing import List

import graphene
import graphene_django_optimizer as gql_optimizer
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import F, QuerySet

from .interfaces import MoveOperation


def clean_seo_fields(data):
    """Extract and assign seo fields to given dictionary."""
    seo_fields = data.pop("seo", None)
    if seo_fields:
        data["seo_title"] = seo_fields.get("title")
        data["seo_description"] = seo_fields.get("description")


def snake_to_camel_case(name):
    """Convert snake_case variable name to camelCase."""
    if isinstance(name, str):
        split_name = name.split("_")
        return split_name[0] + "".join(map(str.capitalize, split_name[1:]))
    return name


def str_to_enum(name):
    """Create an enum value from a string."""
    return name.replace(" ", "_").replace("-", "_").upper()


def validate_image_file(file, field_name):
    """Validate if the file is an image."""
    if not file.content_type.startswith("image/"):
        raise ValidationError({field_name: "Invalid file type"})


def from_global_id_strict_type(info, global_id, only_type, field="id"):
    """Resolve a node global id with a strict given type required."""
    _type, _id = graphene.Node.from_global_id(global_id)
    graphene_type = info.schema.get_type(_type).graphene_type
    if graphene_type != only_type:
        raise ValidationError({field: "Couldn't resolve to a node: %s" % global_id})
    return _id


def get_node_optimized(qs, lookup, info):
    qs = qs.filter(**lookup)
    qs = gql_optimizer.query(qs, info)
    return qs[0] if qs else None


def _prepare_reordering_operations(qs: QuerySet, moves: List[MoveOperation]):
    """Updates the 'moves' relative sort orders to an absolute sorting."""

    # FIXME: we never update those values, which is incorrect.
    #        This should be refactored.
    nodes_map = OrderedDict(
        qs.select_for_update().values_list("pk", "sort_order").order_by("sort_order")
    )
    nodes_pks = list(nodes_map.keys())

    for move in moves:
        if move.sort_order == 0:
            move.sort_order = None
            continue

        # Flag as moving down if the shift is positive
        move.moving_down = move.sort_order > 0

        # Retrieve the position of the node to move
        try:
            node_pos = nodes_pks.index(move.node.pk)
        except ValueError:
            # If the target node was deleted, skip it
            move.sort_order = None
            continue

        # Set the target position from the current position
        # of the node + the relative position to move from
        target_pos = node_pos + move.sort_order

        # Make sure we are not getting out of bounds
        target_pos = max(0, target_pos)
        target_pos = min(len(nodes_pks) - 1, target_pos)

        # Retrieve the target node and its sort order
        target_pk = nodes_pks[target_pos]
        move.sort_order = nodes_map[target_pk]


def perform_reordering(qs: QuerySet, moves: List[MoveOperation]):
    """This utility takes a set of operations containing a node
    and a relative sort order. It then converts the relative sorting
    to an absolute sorting.

    This will then commit the changes onto the nodes.

    Example usage:
    >>> from typing import Dict, Tuple
    >>>
    >>> from graphene import Node
    >>>
    >>> from saleor.graphql.core.interfaces import MoveOperation
    >>>
    >>>
    >>> # operations => [(node_id, relative_sort_order), ...]
    >>>
    >>> def reorder_my_models(info, operations: List[Tuple[int, int]]):
    ...
    ...     # moves => [OP(node, sort_order), ...]
    ...     moves = [
    ...         MoveOperation(Node.from_global_id(node=op[0]), sort_order=op[1])
    ...         for op in operations
    ...     ]
    ...
    ...     perform_reordering(qs, moves)
    ...

    :raises RuntimeError: If the bulk operation is not run inside an atomic transaction.
    :raises ValueError: If a move is invalid.
    """

    if not transaction.get_connection().in_atomic_block:
        raise RuntimeError("Needs to be run inside an atomic transaction")

    _prepare_reordering_operations(qs, moves)

    for move in moves:
        old_sort_order = move.node.sort_order
        new_sort_order = move.sort_order

        # Skip if noting to do
        if new_sort_order is None:
            continue

        # Shift the sort orders within the moving range
        if move.moving_down:
            qs.filter(sort_order__range=(old_sort_order, new_sort_order)).update(
                sort_order=F("sort_order") - 1
            )
        else:
            qs.filter(sort_order__range=(new_sort_order, old_sort_order)).update(
                sort_order=F("sort_order") + 1
            )

        move.node.sort_order = new_sort_order
        move.node.save(update_fields=["sort_order"])
