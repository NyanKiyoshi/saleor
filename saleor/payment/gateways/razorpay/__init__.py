import razorpay
import uuid
from typing import Dict, Tuple

from saleor.payment import TransactionKind
from saleor.payment.utils import create_transaction
from saleor.payment.models import Payment, Transaction

from .forms import RazorPaymentForm


def get_form_class():
    return RazorPaymentForm


def get_client(public_key, secret_key, **_):
    razorpay_client = razorpay.Client(auth=(public_key, secret_key))
    return razorpay_client


def get_client_token(**connection_params):
    return str(uuid.uuid4())


def charge(
        payment: Payment,
        payment_token: str,
        **connection_params: Dict) -> Tuple[Transaction, str]:

    razorpay_client = get_client(**connection_params)

    response = razorpay_client.payment.capture(
        payment_token, int(payment.total * 100))

    transaction = create_transaction(
        payment=payment,
        kind=TransactionKind.AUTH,
        amount=payment.total,
        currency=response.pop('currency', payment.currency),
        gateway_response=response,
        token=response['id'],
        is_success=True)
    return transaction, ''


def refund(self, payment, amount=None):
    raise NotImplementedError


def void(payment, **params):
    txn = create_transaction(
        payment=payment,
        kind=TransactionKind.VOID,
        amount=payment.total,
        currency=payment.currency,
        token=get_client_token(**params),
        is_success=True)
    return txn, ''
