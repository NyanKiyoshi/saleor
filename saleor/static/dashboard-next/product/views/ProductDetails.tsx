import Hidden from "material-ui/Hidden";
import { withStyles } from "material-ui/styles";
import * as React from "react";

import { productEditUrl } from "..";
import Navigator from "../../components/Navigator";
import { pageStorefrontUrl } from "../../page";
import ProductCollections from "../components/ProductCollections";
import ProductDescription from "../components/ProductDescription";
import ProductImages from "../components/ProductImages";
import ProductPriceAndAvailability from "../components/ProductPriceAndAvailability";
import ProductVariants from "../components/ProductVariants";

const product = {
  attributes: '{"1": "1", "2": "4", "3": "6"}',
  availability: {
    available: true,
    onSale: true
  },
  availableOn: null,
  category: {
    id: "Q2F0ZWdvcnk6MQ=="
  },
  slug: "medina-barnes",
  collections: [
    {
      id: "UHSJasdjsatJSAj=",
      name: "Winter collection"
    },
    {
      id: "UHSJasdjsatJSAj=",
      name: "Evil developer's choice"
    }
  ],
  description:
    "Challenge carry create daughter debate. Amount leader college where raise. Pass nor energy that television job.\n\nLeft five personal figure daughter. Actually company page include light summer people. Thank why consider car. Federal community community activity region during.\n\nTurn specific data. Knowledge chair win star. Always thus part hot it drug quickly current.\n\nVarious dog safe son often. President season military happy situation none medical.\n\nBetween answer ball actually include no hand.",
  id: "UHJvZHVjdDox",
  images: [
    {
      id: "UHJvZHVjdEltYWdlOjE=",
      alt: "",
      order: 0,
      url: "/media/products/saleor/static/placeholders/t-shirts/5_cLzVLiR.jpg"
    },
    {
      id: "UHJvZHVjdEltYWdlOjI=",
      alt: "",
      order: 1,
      url: "/media/products/saleor/static/placeholders/t-shirts/5_5UrD4zQ.jpg"
    },
    {
      id: "UHJvZHVjdEltYWdlOjM=",
      alt: "",
      order: 2,
      url: "/media/products/saleor/static/placeholders/t-shirts/5_ywk5ZFz.jpg"
    },
    {
      id: "UHJvZHVjdEltYWdlOjQ=",
      alt: "",
      order: 3,
      url: "/media/products/saleor/static/placeholders/t-shirts/5_IqRhZqc.jpg"
    }
  ],
  isPublished: true,
  name: "Medina-Barnes",
  price: {
    amount: 96.65,
    currency: "USD",
    localized: "96,65 USD"
  },
  productType: {
    id: "1"
  },
  updatedAt: "2018-03-27T12:35:41.198391+00:00",
  variants: [
    {
      id: "123123123",
      sku: "9481723647712",
      name: "Color:White Material:Wool",
      availability: true,
      price: {
        grossLocalized: "14 USD"
      },
      grossMargin: "0 USD"
    },
    {
      id: "12312312w3",
      sku: "9481723647713",
      name: "Color:Blac Material:Wool",
      availability: true,
      price: {
        grossLocalized: "15 USD"
      },
      grossMargin: "1 USD"
    },
    {
      id: "123123123",
      sku: "9481723647712",
      name: "Color:Blue Material:Acryl",
      availability: false,
      price: {
        grossLocalized: "12 USD"
      },
      grossMargin: "0 USD"
    }
  ]
};

const decorate = withStyles(theme => ({
  root: {
    display: "grid",
    gridGap: theme.spacing.unit + "px",
    gridTemplateColumns: "100%",
    [theme.breakpoints.up("md")]: {
      gridGap: theme.spacing.unit * 2 + "px",
      gridTemplateColumns: "3fr 1fr"
    }
  }
}));

export const ProductDetails = decorate(({ classes }) => (
  <Navigator>
    {navigate => (
      <div className={classes.root}>
        <div>
          <ProductDescription
            product={product}
            onBack={() => window.history.back()}
            // TODO: Replace when API is ready
            onDelete={() => {}}
            onEdit={id => () => navigate(productEditUrl(id))}
            onShow={(slug: string) => window.open(pageStorefrontUrl(slug))}
          />
          <Hidden smDown>
            <ProductImages imageList={product.images} />
          </Hidden>
        </div>
        <div>
          <ProductPriceAndAvailability onPublish={event => {}} />
          <ProductCollections
            collections={product.collections}
            // TODO: Replace when API is ready
            onRowClick={id => () => navigate("#")}
          />
        </div>
        <Hidden mdUp>
          <div>
            <ProductImages imageList={product.images} />
          </div>
        </Hidden>
        <ProductVariants
          variants={product.variants}
          // TODO: Replace when API is ready
          onRowClick={id => () => navigate("#")}
        />
      </div>
    )}
  </Navigator>
));
export default ProductDetails;
