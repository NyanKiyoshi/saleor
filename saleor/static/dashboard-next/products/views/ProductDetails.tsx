import Hidden from "material-ui/Hidden";
import { withStyles } from "material-ui/styles";
import * as React from "react";

import { productEditUrl } from "..";
import { productStorefrontUrl } from "../";
import Navigator from "../../components/Navigator";
import ProductCollections from "../components/ProductCollections";
import ProductDescription from "../components/ProductDescription";
import ProductDetailsPage from "../components/ProductDetailsPage";
import ProductImages from "../components/ProductImages";
import ProductPriceAndAvailability from "../components/ProductPriceAndAvailability";
import ProductVariants from "../components/ProductVariants";
import { productDetailsQuery, TypedProductDetailsQuery } from "../queries";

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
  <Navigator>{navigate => <ProductDetailsPage />}</Navigator>
));
export default ProductDetails;
