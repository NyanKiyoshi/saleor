import json
import logging

import requests

from sys import argv
from pathlib import Path
from os.path import basename

from .Tax import *


logger = logging.getLogger(__name__)

TAX_PATH = Path.home() / '.taxrates.json'

RATES = {}


def load_data(path=TAX_PATH):
    try:
        new_rates = {}

        for country_code, data in _get_taxes(path).items():
            new_rates[country_code] = CountryTax(
                standard_rate=data['standard_rate'], reduced_rates=data['reduced_rates']
            )

        RATES.update(new_rates)
    except RuntimeError as e:
        logger.exception(e)


def _get_taxes(path: Path=TAX_PATH) -> dict:
    if not path.exists():
        raise RuntimeError('Not data found.')

    with path.open('r') as fp:
        return json.load(fp)


def export_rates(rates: dict, path: Path):
    with path.open('w') as fp:
        json.dump(rates, fp)


def refresh_rates(api_key, path: Path):
    rq = requests.get(
        'http://apilayer.net/api/rate_list?access_key={}&format=1'.format(api_key))

    rq.raise_for_status()

    results = rq.json()

    assert results['success'] is True

    export_rates(results['rates'], path)
    
    print('Exported data.')


def get_help(exit_code=None):
    print('Usage: {0} refresh-rates API_KEY [SAVE_PATH]'.format(basename(argv[0])))

    if exit_code is not None:
        exit(exit_code)


def main():
    if len(argv) > 2:

        path = TAX_PATH
        if len(argv) == 4:
            path = Path(argv[3])

        if argv[1] == 'refresh-rates':
            refresh_rates(argv[2], path)
            return

    get_help(1)


if __name__ == '__main__':
    main()
else:
    load_data()
