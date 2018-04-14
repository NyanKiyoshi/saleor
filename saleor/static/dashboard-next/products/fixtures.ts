export const product = {
  id: "UHJvZHVjdDoyOA==",
  name: "Stewart-Barrera",
  description:
    "Light light office style present life military. Enough executive coach cause own.\n\nCare season wrong fly. Example age between discuss assume.\n\nTheir third build might strong account. Worry enter room note level air.\n\nWeight director mother. Because find task with now enter tree management.\n\nSoon name recently ground green. There owner sport box them red information.",
  collections: {
    edges: [
      {
        node: {
          id: "collection-1",
          name: "Winter Collection"
        }
      },
      {
        node: {
          id: "collection-2",
          name: "Summer Collection"
        }
      }
    ]
  },
  price: {
    localized: "95,47 USD"
  },
  grossMargin: [
    {
      start: 56,
      stop: 98
    }
  ],
  purchaseCost: {
    start: {
      gross: {
        localized: "1,88 USD"
      }
    },
    stop: {
      gross: {
        localized: "48,10 USD"
      }
    }
  },
  priceRange: {
    start: {
      net: {
        localized: "55,14 USD"
      }
    },
    stop: {
      net: {
        localized: "88,36 USD"
      }
    }
  },
  isPublished: true,
  availability: {
    available: true
  },
  images: {
    edges: [
      {
        node: {
          id: "UHJvZHVjdEltYWdlOjY2",
          alt: "",
          order: 0,
          url:
            "/media/products/saleor/static/placeholders/coffee/coffee-02_IS8e8b3.jpg"
        }
      },
      {
        node: {
          id: "UHJvZHVjdEltYWdlOjY3",
          alt: "",
          order: 1,
          url:
            "/media/products/saleor/static/placeholders/coffee/coffee-02_ZIk8H8C.jpg"
        }
      },
      {
        node: {
          id: "UHJvZHVjdEltYWdlOjY4",
          alt: "",
          order: 2,
          url:
            "/media/products/saleor/static/placeholders/coffee/coffee-03_i5b2KpM.jpg"
        }
      }
    ]
  },
  variants: {
    edges: [
      {
        node: {
          id: "UHJvZHVjdFZhcmlhbnQ6Nw==",
          sku: "2-1337",
          name: "XXL",
          priceOverride: null,
          stockQuantity: 5
        }
      },
      {
        node: {
          id: "UHJvZHVjdFZhcmlhbnQ6OA==",
          sku: "2-1338",
          name: "XL",
          priceOverride: null,
          stockQuantity: 0
        }
      },
      {
        node: {
          id: "UHJvZHVjdFZhcmlhbnQ6OQ==",
          sku: "2-1339",
          name: "L",
          priceOverride: null,
          stockQuantity: 15
        }
      },
      {
        node: {
          id: "UHJvZHVjdFZhcmlhbnQ6MTA=",
          sku: "2-1340",
          name: "M",
          priceOverride: null,
          stockQuantity: 33
        }
      },
      {
        node: {
          id: "UHJvZHVjdFZhcmlhbnQ6MTE=",
          sku: "2-1341",
          name: "S",
          priceOverride: null,
          stockQuantity: 0
        }
      },
      {
        node: {
          id: "UHJvZHVjdFZhcmlhbnQ6MTI=",
          sku: "2-1342",
          name: "XS",
          priceOverride: null,
          stockQuantity: 0
        }
      }
    ]
  },
  productType: {
    id: "UHJvZHVjdFR5cGU6Mw==",
    name: "Coffee"
  },
  url: "/pl/products/stewart-barrera-28/"
};
export const products = [
  {
    id: "UHJvZHVjdDox",
    name: "Gardner, Graham and King",
    thumbnailUrl:
      "/media/__sized__/products/saleor/static/placeholders/t-shirts/6_tdo7a5D-crop-c0-5__0-5-255x255-70.jpg",
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  },
  {
    id: "UHJvZHVjdDoy",
    name: "Gardner, Graham and King",
    thumbnailUrl:
      "/media/__sized__/products/saleor/static/placeholders/t-shirts/6_tdo7a5D-crop-c0-5__0-5-255x255-70.jpg",
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  },
  {
    id: "UHJvZHVjdDoz",
    name: "Gardner, Graham and King",
    thumbnailUrl:
      "/media/__sized__/products/saleor/static/placeholders/t-shirts/6_tdo7a5D-crop-c0-5__0-5-255x255-70.jpg",
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  },
  {
    id: "UHJvZHVjdDoa",
    name: "Gardner, Graham and King",
    thumbnailUrl:
      "/media/__sized__/products/saleor/static/placeholders/t-shirts/6_tdo7a5D-crop-c0-5__0-5-255x255-70.jpg",
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  }
];

export const variants = product.variants.edges.map(edge => edge.node);
export const grossMargin = product.grossMargin[0];
export const salePrice = {
  start: product.priceRange.start.net.localized,
  stop: product.priceRange.stop.net.localized
};
export const purchaseCost = {
  start: product.purchaseCost.start.gross.localized,
  stop: product.purchaseCost.stop.gross.localized
};
export const collections = product.collections.edges.map(edge => edge.node);
export const images = product.images.edges.map(edge => edge.node);
