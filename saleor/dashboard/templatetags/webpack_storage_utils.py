from django.contrib.staticfiles.storage import StaticFilesStorage
from django.template import Library
from django.utils.safestring import mark_safe
from webpack_loader.loader import WebpackLoader
from webpack_loader.utils import get_files, get_loader

from ...core.storages import LazyStaticFilesStorage

register = Library()


STATIC_FILE_SYSTEM_STORAGE = LazyStaticFilesStorage()  # type: StaticFilesStorage


def _get_setting_key_from_webpack(loader: WebpackLoader, key: str):
    return loader.config[key]


def _get_base_webpack_path(loader: WebpackLoader):
    return _get_setting_key_from_webpack(loader, 'BUNDLE_DIR_NAME')


def _get_relative_link(webpack_dir, chunk: dict):
    relpath = '{0}{1}'.format(webpack_dir, chunk['name'])
    return relpath


def _chunk_to_tag(chunk, url, attrs):
    format_args = (url, attrs)

    if chunk['name'].endswith(('.js', '.js.gz')):
        return (
            '<script type="text/javascript" src="{0}" {1}></script>'
        ).format(*format_args)
    elif chunk['name'].endswith(('.css', '.css.gz')):
        return (
            '<link type="text/css" href="{0}" rel="stylesheet" {1}/>'
        ).format(*format_args)


def _get_bundle_as_relative_tags(bundle_name, extension, config, attrs):
    bundle = get_files(bundle_name, extension=extension, config=config)
    loader = get_loader(config)  # type: WebpackLoader
    webpack_dir = _get_base_webpack_path(loader)

    tags = []
    for chunk in bundle:
        relative_url = _get_relative_link(webpack_dir, chunk)
        tag = _chunk_to_tag(chunk, relative_url, attrs)
        if tag:
            tags.append(tag)

    return tags


@register.simple_tag()
def render_bundle_as_real_path(
        bundle_name, extension=None, config='DEFAULT', attrs=''):
    """This tag is based on:
    ``webpack_loader.templatetags.webpack_loader.render_bundle``.

    This tag does the exact same job as ``render_bundle`` but instead of
    linking to public paths (e.g. /static/dashboard/document.css),
    it links to the real local files.
    """
    tags = _get_bundle_as_relative_tags(bundle_name, extension, config, attrs)
    return mark_safe('\n'.join(tags))
