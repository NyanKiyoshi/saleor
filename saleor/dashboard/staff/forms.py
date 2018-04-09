from django import forms
from django.contrib.auth.models import Group
from django.utils.translation import pgettext_lazy

from ...account.models import User


class StaffForm(forms.ModelForm):
    groups = forms.ModelMultipleChoiceField(
        # TODO: need to populate with authorized groups only
        queryset=Group.objects.all().prefetch_related('permissions'),
        widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = User
        fields = ['email', 'groups', 'is_active']
        labels = {
            'email': pgettext_lazy(
                'Email', 'Email'),
            'groups': pgettext_lazy(
                'Groups', 'Groups'),
            'is_active': pgettext_lazy(
                'User active toggle', 'User is active')}

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        self.instance.is_staff = True

        # disable 'is_active' and 'groups' fields if user edits his own account
        if self.user == self.instance:
            self.fields['is_active'].disabled = True
            self.fields['groups'].disabled = not self.user.is_superuser
