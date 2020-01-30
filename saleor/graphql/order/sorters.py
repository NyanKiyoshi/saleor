import graphene
from django.db.models import FilteredRelation, Max, Q, QuerySet

from ..core.types import SortInputObjectType


class OrderSortField(graphene.Enum):
    NUMBER = "pk"
    CREATION_DATE = ["created", "status", "user_email"]
    CUSTOMER = ["billing_address__first_name", "billing_address__last_name"]
    PAYMENT = ["last_payment__charge_status", "status", "user_email"]
    FULFILLMENT_STATUS = ["status", "user_email"]
    TOTAL = ["total_gross_amount", "status", "user_email"]

    @property
    def description(self):
        # pylint: disable=no-member
        if self in [
            OrderSortField.NAME,
            OrderSortField.CREATION_DATE,
            OrderSortField.CUSTOMER,
            OrderSortField.PAYMENT,
            OrderSortField.FULFILLMENT_STATUS,
            OrderSortField.TOTAL,
        ]:
            sort_name = self.name.lower().replace("_", " ")
            return f"Sort orders by {sort_name}."
        raise ValueError("Unsupported enum value: %s" % self.value)

    @staticmethod
    def prepare_qs_for_sort_payment(
        queryset: QuerySet, sort_by: SortInputObjectType
    ) -> QuerySet:
        last_payments = (
            queryset.exclude(payments__isnull=True)
            .annotate(payment_id=Max("payments__pk"))
            .values_list("payment_id", flat=True)
        )
        return queryset.annotate(
            last_payment=FilteredRelation(
                "payments", condition=Q(payments__pk__in=last_payments)
            )
        )


class OrderSortingInput(SortInputObjectType):
    class Meta:
        sort_enum = OrderSortField
        type_name = "orders"
