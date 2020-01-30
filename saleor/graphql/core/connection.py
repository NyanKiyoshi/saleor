import typing

import graphene
from django.db.models import Q, QuerySet
from graphene import Field, List, NonNull, ObjectType, String
from graphene.relay.connection import Connection
from graphene_django_optimizer.types import OptimizedDjangoObjectType
from graphql_relay.connection.connectiontypes import Edge, PageInfo
from graphql_relay.utils import base64, unbase64

from ..core.enums import OrderDirection

ConnectionArguments = typing.Dict[str, typing.Any]


def to_global_cursor(values):
    if not isinstance(values, List):
        values = [str(values)]
    else:
        values = [str(value) for value in values]
    return base64(":".join(values))


def from_global_cursor(cursor) -> typing.List[str]:
    values = unbase64(cursor)
    values = values.split(":")
    if isinstance(values, list):
        return values
    return [values]


def get_repr(value):
    if callable(value):
        return "%s" % value()
    return value


def get_field(instance, field):
    field_path = field.split("__")
    attr = instance
    for elem in field_path:
        try:
            attr = getattr(attr, elem)
        except AttributeError:
            return None
    return attr


def get_field_value(instance, field_name):
    return get_repr(get_field(instance, field_name))


def connection_args_validation(args):
    first = args.get("first")
    last = args.get("last")

    if isinstance(first, int) and first < 0 or first and not isinstance(first, int):
        raise ValueError("Argument 'first' must be a non-negative integer.")
    if isinstance(last, int) and last < 0 or last and not isinstance(last, int):
        raise ValueError("Argument 'last' must be a non-negative integer.")
    if first and last:
        raise ValueError("Argument 'last' cannot be combined with 'first'.")
    if first and args.get("before"):
        raise ValueError("Argument 'first' cannot be combined with 'before'.")
    if last and args.get("after"):
        raise ValueError("Argument 'last' cannot be combined with 'after'.")


def connection_from_queryset_slice(
    qs: QuerySet,
    args: ConnectionArguments = None,
    connection_type: typing.Any = Connection,
    edge_type: typing.Any = Edge,
    page_info_type: typing.Any = PageInfo,
) -> Connection:
    """Create a connection object from a QuerySet."""
    args = args or {}
    before = args.get("before")
    after = args.get("after")
    first = args.get("first")
    last = args.get("last")
    connection_args_validation(args)

    cursor_after = from_global_cursor(after) if after else None
    cursor_before = from_global_cursor(before) if before else None
    cursor = cursor_after or cursor_before
    cursor_offset = 1 if cursor else 0

    sort_by = args.get("sort_by", {})
    sorting_direction = sort_by.get("direction", "")
    sorting_fields = sort_by.get("field")
    if sorting_fields and not isinstance(sorting_fields, list):
        sorting_fields = [sorting_fields]
    elif not sorting_fields:
        sorting_fields = []

    requested_count = first or last
    end_margin = requested_count + cursor_offset + 1 if requested_count else None

    if last:
        # reversed direction
        sorting_direction_kw = (
            "gte" if sorting_direction == OrderDirection.DESC else "lte"
        )
    else:
        sorting_direction_kw = (
            "lte" if sorting_direction == OrderDirection.DESC else "gte"
        )

    filter_kwargs = Q()
    if cursor and sorting_fields:
        for field_id in range(len(sorting_fields)):
            field_expression = {}
            for val_id in range(len(cursor[:field_id])):
                field_expression[sorting_fields[val_id]] = cursor[val_id]
            field_expression[
                f"{sorting_fields[field_id]}__{sorting_direction_kw}"
            ] = cursor[field_id]
            filter_kwargs |= Q(**field_expression)

    qs = qs.filter(filter_kwargs)[cursor_offset:end_margin]
    if last:
        matching_records = list(reversed(qs))
    else:
        matching_records = list(qs)

    has_previous_page = False
    has_next_page = False
    if requested_count is not None:
        if cursor_after:
            has_next_page = len(matching_records) > requested_count
            has_previous_page = True
        elif cursor_before:
            has_next_page = True
            has_previous_page = len(matching_records) > requested_count
        elif first:
            has_next_page = len(matching_records) > requested_count
        elif last:
            has_previous_page = len(matching_records) > requested_count
        matching_records = matching_records[
            cursor_offset : requested_count + cursor_offset
        ]

    edges = [
        edge_type(
            node=record,
            cursor=to_global_cursor(
                [get_field_value(record, field) for field in sorting_fields]
            ),
        )
        for index, record in enumerate(matching_records)
    ]

    first_edge_cursor = edges[0].cursor if edges else None
    last_edge_cursor = edges[-1].cursor if edges else None

    return connection_type(
        edges=edges,
        page_info=page_info_type(
            start_cursor=first_edge_cursor,
            end_cursor=last_edge_cursor,
            has_previous_page=has_previous_page,
            has_next_page=has_next_page,
        ),
    )


class NonNullConnection(Connection):
    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(cls, node=None, name=None, **options):
        super().__init_subclass_with_meta__(node=node, name=name, **options)

        # Override the original EdgeBase type to make to `node` field required.
        class EdgeBase:
            node = Field(
                cls._meta.node,
                description="The item at the end of the edge.",
                required=True,
            )
            cursor = String(
                required=True, description="A cursor for use in pagination."
            )

        # Create the edge type using the new EdgeBase.
        edge_name = cls.Edge._meta.name
        edge_bases = (EdgeBase, ObjectType)
        edge = type(edge_name, edge_bases, {})
        cls.Edge = edge

        # Override the `edges` field to make it non-null list
        # of non-null edges.
        cls._meta.fields["edges"] = Field(NonNull(List(NonNull(cls.Edge))))


class CountableConnection(NonNullConnection):
    class Meta:
        abstract = True

    total_count = graphene.Int(description="A total count of items in the collection.")

    @staticmethod
    def resolve_total_count(root, *_args, **_kwargs):
        return len(root.iterable)


class CountableDjangoObjectType(OptimizedDjangoObjectType):
    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(cls, *args, **kwargs):
        # Force it to use the countable connection
        countable_conn = CountableConnection.create_type(
            "{}CountableConnection".format(cls.__name__), node=cls
        )
        super().__init_subclass_with_meta__(*args, connection=countable_conn, **kwargs)
