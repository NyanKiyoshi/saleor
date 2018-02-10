import unittest

from pathlib import Path

import TaxRate


class TestTaxRate(unittest.TestCase):
    def setUp(self):
        TaxRate.load_data(Path('.test_data.json'))

        self.france_taxes = TaxRate.RATES['FR']  # type: TaxRate.CountryTax

    def test_load_data(self):
        self.assertEqual(self.france_taxes.rate, 0.20)

    def test_other_rates(self):
        self.assertEqual(0.10, self.france_taxes.get_rate(TaxRate.TaxType.HOTELS))
        self.assertEqual(0.055, self.france_taxes.get_rate(TaxRate.TaxType.E_BOOKS))
        self.assertEqual(0.021, self.france_taxes.get_rate(TaxRate.TaxType.NEWSPAPERS))

    def test_get_price(self):
        self.assertEqual(self.france_taxes.get_taxed(1), 1.20)
