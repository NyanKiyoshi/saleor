from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import permission_required
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from django.template.response import TemplateResponse
from django.utils.translation import pgettext_lazy

from ...account.models import User
from ...core.utils import get_paginator_items
from ..views import staff_member_required
from .filters import UserFilter
from .forms import CustomerForm


def _handle_customer_form(request, customer, success_message):
    form = CustomerForm(request.POST or None, instance=customer)
    if form.is_valid():
        form.save()
        msg = success_message % customer
        messages.success(request, msg)
        return redirect('dashboard:customer-details', pk=customer.pk)
    ctx = {'form': form, 'customer': customer}
    return TemplateResponse(request, 'dashboard/customer/form.html', ctx)


@staff_member_required
@permission_required('account.edit_user')
def customer_create(request):
    success_msg = pgettext_lazy('Dashboard message', 'Added customer %s')
    customer = User()
    return _handle_customer_form(request, customer, success_msg)


@staff_member_required
@permission_required('account.edit_user')
def customer_edit(request, pk=None):
    success_msg = pgettext_lazy('Dashboard message', 'Updated customer %s')
    customer = get_object_or_404(User, pk=pk)
    return _handle_customer_form(request, customer, success_msg)


@staff_member_required
@permission_required('account.view_user')
def customer_details(request, pk):
    queryset = User.objects.prefetch_related(
        'orders', 'addresses').select_related(
            'default_billing_address', 'default_shipping_address')
    customer = get_object_or_404(queryset, pk=pk)
    customer_orders = customer.orders.all()
    ctx = {
        'customer': customer, 'customer_orders': customer_orders,
        'can_edit_user': not customer.cannot_be_edited_by(request.user)}
    return TemplateResponse(request, 'dashboard/customer/detail.html', ctx)


@staff_member_required
@permission_required('account.view_user')
def customer_list(request):
    customers = (
        User.objects
        .filter(
            Q(is_staff=False) | (Q(is_staff=True) & Q(orders__isnull=False)))
        .distinct()
        .prefetch_related('orders', 'addresses')
        .select_related('default_billing_address', 'default_shipping_address')
        .order_by('email'))
    customer_filter = UserFilter(request.GET, queryset=customers)
    customers = get_paginator_items(
        customer_filter.qs, settings.DASHBOARD_PAGINATE_BY,
        request.GET.get('page'))
    ctx = {
        'customers': customers, 'filter_set': customer_filter,
        'is_empty': not customer_filter.queryset.exists()}
    return TemplateResponse(request, 'dashboard/customer/list.html', ctx)


@staff_member_required
@permission_required('account.view_user')
def ajax_users_list(request):
    queryset = User.objects.select_related('default_billing_address')
    search_query = request.GET.get('q', '')
    if search_query:
        queryset = queryset.filter(
            Q(default_billing_address__first_name__icontains=search_query) |
            Q(default_billing_address__last_name__icontains=search_query) |
            Q(email__icontains=search_query))

    users = [
        {'id': user.pk, 'text': user.ajax_label} for user in queryset]
    return JsonResponse({'results': users})
