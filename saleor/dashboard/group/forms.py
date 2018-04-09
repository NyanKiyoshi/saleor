from django import forms
from django.contrib.auth.models import Group, Permission
from django.utils.translation import pgettext_lazy

from ...core.permissions import get_modifiable_permissions
from .checks import can_edit_group_or_raise


class GroupPermissionsForm(forms.ModelForm):
    class Meta:
        model = Group
        fields = ['name', 'permissions']
        labels = {
            'name': pgettext_lazy('Item name', 'Name'),
            'permissions': pgettext_lazy('Permissions', 'Permissions')}

    permissions = forms.ModelMultipleChoiceField(
        queryset=Permission.objects.none(),
        widget=forms.CheckboxSelectMultiple)

    def __init__(self, *args, current_user=None, instance=None, **kwargs):
        super().__init__(*args, instance=instance, **kwargs)
        self.current_user = current_user

        if self.current_user:
            permission_field = self.fields['permissions']
            permission_field.queryset = get_modifiable_permissions(
                self.current_user)

    def clean(self):
        # check if non-superuser is part of the group they are trying to edit
        # raise exception they are
        if self.instance and self.current_user:
            can_edit_group_or_raise(self.current_user, self.instance)
        return super(GroupPermissionsForm, self).clean()
