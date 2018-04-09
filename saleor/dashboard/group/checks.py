from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError
from django.utils.translation import pgettext_lazy

from ...account.models import User


def can_edit_group(user: User, group: Group):
    return user.is_superuser or user.groups.filter(pk=group.pk).exists()


def can_edit_group_or_raise(user: User, group: Group):
    if not can_edit_group(user, group):
        raise ValidationError(pgettext_lazy(
            'Group modification form validation error',
            'You cannot edit groups you are part of.'
        ))
