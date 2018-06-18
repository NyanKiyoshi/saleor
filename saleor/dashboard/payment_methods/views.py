from django.shortcuts import redirect
from django.template.response import TemplateResponse

from ...order.models import CheckoutPaymentMethod
from ..views import staff_member_required
from .forms import CheckoutPaymentMethodForm


@staff_member_required
def payment_methods_list(request):
    methods = CheckoutPaymentMethod.objects.all()
    ctx = {'methods': methods}
    return TemplateResponse(
        request, 'dashboard/payment-methods/list.html', ctx)


@staff_member_required
def payment_methods_create(request):
    form = CheckoutPaymentMethodForm(request.POST)
    if form.is_valid():
        form.save()
        return redirect('dashboard:payment-methods')
    ctx = {'form': form}
    return TemplateResponse(
        request, 'dashboard/payment-methods/form.html', ctx)
