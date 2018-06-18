from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.payment_methods_list, name='payment-methods'),
    url(r'^add/$', views.payment_methods_create,
        name='payment-methods-create')]
