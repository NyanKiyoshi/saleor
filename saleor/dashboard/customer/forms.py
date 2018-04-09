from django import forms
from django.core.exceptions import PermissionDenied
from django.utils.translation import pgettext_lazy

from ...account.models import User


class CustomerForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        # disable 'is_active' checkbox if user edits his own account
        if self.user == self.instance:
            self.fields['is_active'].disabled = True
        elif self.instance and \
                self.instance.cannot_be_edited_by(self.user):
            raise PermissionDenied(pgettext_lazy(
                'You cannot edit an user having a higher hierarchy '
                'than you do.'))

    class Meta:
        model = User

        # note: be careful to not allow to edit the 'groups' field,
        #       otherwise,
        #       put a check if the user is not adding groups to itself.
        #       --- see: saleor.dashboard.staff.forms.StaffForm
        fields = ['email', 'is_active']
