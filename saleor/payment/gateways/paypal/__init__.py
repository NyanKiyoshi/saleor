import logging
import uuid
from decimal import Decimal
from typing import Dict

import razorpay
import razorpay.errors
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment
from paypalcheckoutsdk.orders import OrdersAuthorizeRequest

from ... import TransactionKind
from ...interface import GatewayConfig, GatewayResponse, PaymentData
from . import errors
from .forms import RazorPaymentForm
from .utils import get_amount_for_razorpay, get_error_response

# Define what are the razorpay exceptions,
# as the razorpay provider doesn't define a base exception as of now.
RAZORPAY_EXCEPTIONS = (
    razorpay.errors.BadRequestError,
    razorpay.errors.GatewayError,
    razorpay.errors.ServerError,
)

# Get the logger for this file, it will allow us to log
# error responses from razorpay.
logger = logging.getLogger(__name__)


def _generate_response(
    payment_information: PaymentData, kind: str, data: Dict
) -> GatewayResponse:
    """Generate Saleor transaction information from
    Razorpay's success payload or from passed data."""
    return GatewayResponse(
        transaction_id=data.get("id", payment_information.token),
        kind=kind,
        amount=data.get("amount", payment_information.amount),
        currency=data.get("currency", payment_information.currency),
        error=data.get("error"),
        is_success=data.get("is_success", True),
        raw_response=data,
    )


def create_form(data, payment_information, connection_params):
    """Return the associated razorpay payment form."""
    return RazorPaymentForm(
        data=data,
        payment_information=payment_information,
        connection_params=connection_params,
    )


def get_client(client_id: str, client_secret: str, **_):
    """Create a Razorpay client from set-up application keys."""
    environment = SandboxEnvironment(client_id=client_id, client_secret=client_secret)
    client = PayPalHttpClient(environment)
    return client


def get_client_token(**_):
    """Generate a random client token."""
    return str(uuid.uuid4())


def authorize(payment_information: PaymentData, config: GatewayConfig) -> GatewayResponse:
    request = OrdersAuthorizeRequest(order_id)


def capture(payment_information: PaymentData, config: GatewayConfig) -> GatewayResponse:
    """Capture a authorized payment using the razorpay client.
    But it first check if the given payment instance is supported
    by the gateway.

    If an error from razorpay occurs,
    we flag the transaction as failed and return
    a short user friendly description of the error
    after logging the error to stderr."""
    error = check_payment_supported(payment_information=payment_information)
    razorpay_client = get_client(**config.connection_params)
    razorpay_amount = get_amount_for_razorpay(payment_information.amount)

    if not error:
        try:
            response = razorpay_client.payment.capture(
                payment_information.token, razorpay_amount
            )
            clean_razorpay_response(response)
        except RAZORPAY_EXCEPTIONS as exc:
            error = get_error_message_from_razorpay_error(exc)
            response = get_error_response(
                payment_information.amount, error=error, id=payment_information.token
            )
    else:
        response = get_error_response(
            payment_information.amount, error=error, id=payment_information.token
        )

    return _generate_response(
        payment_information=payment_information,
        kind=TransactionKind.CAPTURE,
        data=response,
    )


def refund(payment_information: PaymentData, config: GatewayConfig) -> GatewayResponse:
    """Refund a payment using the razorpay client.

    But it first check if the given payment instance is supported
    by the gateway.

    It first retrieve a `charge` transaction to retrieve the
    payment id to refund. And return an error with a failed transaction
    if the there is no such transaction, or if an error
    from razorpay occurs during the refund."""
    error = check_payment_supported(payment_information=payment_information)

    if error:
        response = get_error_response(payment_information.amount, error=error)
    else:
        razorpay_client = get_client(**config.connection_params)
        razorpay_amount = get_amount_for_razorpay(payment_information.amount)
        try:
            response = razorpay_client.payment.refund(
                payment_information.token, razorpay_amount
            )
            clean_razorpay_response(response)
        except RAZORPAY_EXCEPTIONS as exc:
            error = get_error_message_from_razorpay_error(exc)
            response = get_error_response(payment_information.amount, error=error)

    return _generate_response(
        payment_information=payment_information,
        kind=TransactionKind.REFUND,
        data=response,
    )


def process_payment(
    payment_information: PaymentData, config: GatewayConfig
) -> GatewayResponse:
    return capture(payment_information=payment_information, config=config)
