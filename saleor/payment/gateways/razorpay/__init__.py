from decimal import Decimal

import razorpay
import uuid
from typing import Dict, Tuple

from saleor.payment import TransactionKind
from saleor.payment.utils import create_transaction
from saleor.payment.models import Payment, Transaction

from .forms import RazorPaymentForm


def _generate_transaction(payment, kind: str, amount=None, *, id, **data):
    if type(amount) is int:
        amount = Decimal(amount) / 100
    elif amount is None:
        amount = payment.total

    transaction = create_transaction(
        payment=payment,
        kind=kind,
        amount=amount,
        currency=data.pop('currency', payment.currency),
        gateway_response=data,
        token=id,
        is_success=True)
    return transaction


def get_form_class():
    return RazorPaymentForm


def get_client(public_key, secret_key, **_):
    razorpay_client = razorpay.Client(auth=(public_key, secret_key))
    return razorpay_client


def get_client_token(**_):
    return str(uuid.uuid4())


def charge(
        payment: Payment,
        payment_token: str,
        **connection_params: Dict) -> Tuple[Transaction, str]:

    razorpay_client = get_client(**connection_params)

    response = razorpay_client.payment.capture(
        payment_token, int(payment.total * 100))
    transaction = _generate_transaction(
        payment=payment, kind=TransactionKind.CHARGE, **response)
    return transaction, ''


def refund(payment, amount, **connection_params):
    capture_txn = payment.transactions.filter(
        kind=TransactionKind.CHARGE, is_success=True).get()
    razorpay_client = get_client(**connection_params)
    response = razorpay_client.payment.refund(
        capture_txn.token, int(amount * 100))
    txn = _generate_transaction(
        payment=payment, kind=TransactionKind.REFUND, **response)
    return txn, ''


def void(payment, **params):
    txn = _generate_transaction(
        payment=payment, kind=TransactionKind.VOID,
        id=get_client_token(**params))
    return txn, ''
