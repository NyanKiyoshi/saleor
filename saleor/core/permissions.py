from django.contrib.auth.models import Permission, User

MODELS_PERMISSIONS = [
    'menu.view_menu',
    'menu.edit_menu',
    'order.view_order',
    'order.edit_order',
    'page.view_page',
    'page.edit_page',
    'product.view_category',
    'product.edit_category',
    'product.view_product',
    'product.edit_product',
    'product.view_properties',
    'product.edit_properties',
    'product.view_stock_location',
    'product.edit_stock_location',
    'sale.view_sale',
    'sale.edit_sale',
    'shipping.view_shipping',
    'shipping.edit_shipping',
    'site.edit_settings',
    'site.view_settings',
    'user.view_user',
    'user.edit_user',
    'user.view_group',
    'user.edit_group',
    'user.view_staff',
    'user.edit_staff',
    'user.impersonate_user',
    'voucher.view_voucher',
    'voucher.edit_voucher',
]

PERMISSION_CODENAMES = [
    permission.split('.')[1] for permission in MODELS_PERMISSIONS]


def _permissions_from_queryset(queryset):
    return queryset.filter(codename__in=PERMISSION_CODENAMES) \
        .prefetch_related('content_type')


def get_all_permissions():
    return _permissions_from_queryset(Permission.objects)


def get_modifiable_permissions(user: User):
    if not user.is_superuser:
        available_permissions = user.user_permissions
    else:
        available_permissions = Permission.objects
    return _permissions_from_queryset(available_permissions)
