from django import forms
from ...order.models import CheckoutPaymentMethod


class CheckoutPaymentMethodForm(forms.ModelForm):
    class Meta:
        model = CheckoutPaymentMethod
        exclude = []
