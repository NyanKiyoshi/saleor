import enum


class TaxType(enum.Enum):
    E_BOOKS                           = 'e-books'
    DOMESTIC_SERVICES                 = 'domestic services'
    BIKES                             = 'bikes'
    PASSENGER_TRANSPORT               = 'passenger transport'
    WATER                             = 'water'
    CHILDRENS_CLOTHING                = 'childrens clothing'
    BOOKS                             = 'books'
    ADVERTISING                       = 'advertising'
    ACCOMMODATION                     = 'accommodation'
    HOTELS                            = 'hotels'
    AGRICULTURAL_SUPPLIES             = 'agricultural supplies'
    SOCIAL_HOUSING                    = 'social housing'
    ADMISSION_TO_ENTERTAINMENT_EVENTS = 'admission to entertainment events'
    PROPERTY_RENOVATIONS              = 'property renovations'
    MEDICAL                           = 'medical'
    PHARMACEUTICALS                   = 'pharmaceuticals'
    ADMISSION_TO_SPORTING_EVENTS      = 'admission to sporting events'
    WINE                              = 'wine'
    DOMESTIC_FUEL                     = 'domestic fuel'
    FOODSTUFFS                        = 'foodstuffs'
    RESTAURANTS                       = 'restaurants'
    NEWSPAPERS                        = 'newspapers'
    BABY_FOODSTUFFS                   = 'baby foodstuffs'
    ADMISSION_TO_CULTURAL_EVENTS      = 'admission to cultural events'


class CountryTax:
    def __init__(self, standard_rate, reduced_rates: dict=None):
        self.rate = self._get_multiplier(standard_rate)

        if reduced_rates:
            for k in TaxType._value2member_map_:
                rate = reduced_rates.get(k, 0)

                rate = rate and self._get_multiplier(rate) or self.rate

                setattr(self, k, rate)

    @staticmethod
    def _get_multiplier(rate):
        return rate / 100.0

    def get_rate(self, rate_type: TaxType=None):
        if rate_type:
            return getattr(self, rate_type.value)
        return self.rate

    def get_taxed(self, price, rate_type: TaxType=None):
        return float(price) * (1 + self.get_rate(rate_type))

    def get_tax(self, price, rate_type: TaxType=None):
        return float(price) * self.get_rate(rate_type)


__all__ = ('CountryTax', 'TaxType')
