import json

from django.shortcuts import reverse


def test_ajax_users_list(admin_client, admin_user, customer_user):
    users_list = [
        {'id': admin_user.pk, 'text': admin_user.ajax_label},
        {'id': customer_user.pk, 'text': customer_user.ajax_label}]
    url = reverse('dashboard:ajax-users-list')

    response = admin_client.get(url, HTTP_X_REQUESTED_WITH='XMLHttpRequest')
    resp_decoded = json.loads(response.content.decode('utf-8'))

    assert response.status_code == 200
    assert resp_decoded == {'results': users_list}


def test_customer_list():
    pass


def test_customer_details():
    pass


def test_customer_create():
    pass


def test_customer_edit():
    pass
