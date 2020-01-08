from typing import Optional

import opentracing
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.utils.functional import SimpleLazyObject
from graphql_jwt.middleware import JSONWebTokenMiddleware

from ..account.models import ServiceAccount
from .views import API_PATH, GraphQLView


class JWTMiddleware(JSONWebTokenMiddleware):
    def resolve(self, next, root, info, **kwargs):
        request = info.context

        if not hasattr(request, "user"):
            request.user = AnonymousUser()
        return super().resolve(next, root, info, **kwargs)


def should_trace(info):
    if info.field_name not in info.parent_type.fields:
        return False

    return not info.field_name.startswith("__")


class OpentracingGrapheneMiddleware:
    @staticmethod
    def resolve(next, root, info, **kwargs):
        with opentracing.global_tracer().start_span(
            operation_name=info.operation.operation
        ) as span:
            span.set_tag("component", "graphql")
            span.set_tag("graphql.parent_type", info.parent_type.name)
            span.set_tag("graphql.field_name", info.field_name)
            return next(root, info, **kwargs)


def get_service_account(auth_token) -> Optional[ServiceAccount]:
    qs = ServiceAccount.objects.filter(tokens__auth_token=auth_token, is_active=True)
    return qs.first()


def service_account_middleware(next, root, info, **kwargs):

    service_account_auth_header = "HTTP_AUTHORIZATION"
    prefix = "bearer"
    request = info.context

    if request.path == API_PATH:
        if not hasattr(request, "service_account"):
            request.service_account = None
            auth = request.META.get(service_account_auth_header, "").split()
            if len(auth) == 2:
                auth_prefix, auth_token = auth
                if auth_prefix.lower() == prefix:
                    request.service_account = SimpleLazyObject(
                        lambda: get_service_account(auth_token)
                    )
    return next(root, info, **kwargs)


def process_view(self, request, view_func, *args):
    if hasattr(view_func, "view_class") and issubclass(
        view_func.view_class, GraphQLView
    ):
        request._graphql_view = True


if settings.ENABLE_DEBUG_TOOLBAR:
    import warnings

    try:
        from graphiql_debug_toolbar.middleware import DebugToolbarMiddleware
    except ImportError:
        warnings.warn("The graphiql debug toolbar was not installed.")
    else:
        DebugToolbarMiddleware.process_view = process_view
