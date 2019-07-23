import pytest

from saleor.graphql.core.interfaces import MoveOperation
from saleor.graphql.core.utils import perform_reordering
from saleor.product import models

SortedModel = models.AttributeValue


def _sorted_by_order(items):
    return sorted(items, key=lambda o: o[1])


def _get_sorted_map():
    return list(
        SortedModel.objects.values_list("pk", "sort_order").order_by("sort_order")
    )


@pytest.fixture
def sorted_entries_seq():
    attribute = models.Attribute.objects.create(name="Dummy")
    values = SortedModel.objects.bulk_create(
        [
            SortedModel(
                attribute=attribute, slug=f"value-{i}", name=f"Value-{i}", sort_order=i
            )
            for i in range(6)
        ]
    )
    return list(values)


@pytest.fixture
def sorted_entries_gaps():
    attribute = models.Attribute.objects.create(name="Dummy")
    values = SortedModel.objects.bulk_create(
        [
            SortedModel(
                attribute=attribute, slug=f"value-{i}", name=f"Value-{i}", sort_order=i
            )
            for i in range(0, 12, 2)
        ]
    )
    return list(values)


def test_reordering_sequential(sorted_entries_seq):
    """
    Ensures the reordering logic works as expected. This test simply provides
    sequential sort order values and try to reorder them.
    """
    qs = SortedModel.objects
    nodes = sorted_entries_seq

    operations = [MoveOperation(nodes[5], -1), MoveOperation(nodes[2], +3)]

    expected = _sorted_by_order(
        [
            (nodes[0].pk, 0),
            (nodes[1].pk, 1),
            (nodes[2].pk, 2 + 3),
            (nodes[3].pk, 3 - 1),
            (nodes[4].pk, 4 + 1 - 1),
            (nodes[5].pk, 5 - 1 - 1),
        ]
    )

    perform_reordering(qs, operations)

    actual = _get_sorted_map()
    assert actual == expected


def test_reordering_non_sequential(sorted_entries_gaps):
    """
    Ensures that reordering non-sequential sort order values is properly
    handled. This case happens when an item gets deleted, creating gaps between values.
    """
    qs = SortedModel.objects
    nodes = sorted_entries_gaps

    operations = [MoveOperation(nodes[5], -1), MoveOperation(nodes[2], +3)]

    expected = _sorted_by_order(
        [
            (nodes[0].pk, 0),
            (nodes[1].pk, 2),
            (nodes[2].pk, 4 + (3 * 2)),
            (nodes[3].pk, 6 - 1),
            (nodes[4].pk, 8 + 1 - 1),
            (nodes[5].pk, 10 - (1 * 2) - 1),
        ]
    )

    perform_reordering(qs, operations)

    actual = _get_sorted_map()
    assert actual == expected


@pytest.mark.parametrize(
    "operation, expected_operations",
    [((0, +5), (+5, -1, -1, -1, -1, -1)), ((5, -5), (+1, +1, +1, +1, +1, -5))],
)
def test_inserting_at_the_edges(sorted_entries_seq, operation, expected_operations):
    """
    Ensures it is possible to move an item at the top and bottom of the list.
    """
    qs = SortedModel.objects
    nodes = sorted_entries_seq

    target_node_pos, new_rel_sort_order = operation

    operations = [MoveOperation(nodes[target_node_pos], new_rel_sort_order)]

    expected = _sorted_by_order(
        [
            (node.pk, node.sort_order + op)
            for node, op in zip(nodes, expected_operations)
        ]
    )

    perform_reordering(qs, operations)

    actual = _get_sorted_map()
    assert actual == expected


def test_reordering_out_of_bound(sorted_entries_seq):
    """
    Ensures it is not possible to manually create gaps or for the users
    to insert anywhere they want, e.g. -1000, which could create a mess
    into the database.
    """
    qs = SortedModel.objects
    nodes = sorted_entries_seq

    operations = [MoveOperation(nodes[5], -100), MoveOperation(nodes[0], +100)]

    expected = _sorted_by_order(
        [
            (nodes[0].pk, 0 + 5),
            (nodes[1].pk, 1),
            (nodes[2].pk, 2),
            (nodes[3].pk, 3),
            (nodes[4].pk, 4),
            (nodes[5].pk, 5 - 5),
        ]
    )

    perform_reordering(qs, operations)

    actual = _get_sorted_map()
    assert actual == expected


def test_reordering_nothing():
    """
    Ensures giving operations that does nothing, are skipped.
    """


def test_reordering_concurrently(sorted_entries_seq):
    """
    Ensures users cannot concurrently reorder, they need to wait for the other one
    to achieve.
    """


def test_reordering_deleted_node_from_concurrent():
    """
    Ensures if a node was deleted before locking, it just skip it instead of
    raising an error.
    """
