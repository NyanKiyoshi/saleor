#!/usr/bin/env sh

DEBUG=False DJANGO_SETTINGS_MODULE=saleor.settings_local SECRET_KEY=abc daphne -p 8002 saleor.asgi:application
