import Hidden from "material-ui/Hidden";
import { withStyles } from "material-ui/styles";
import * as React from "react";

import ProductCollections from "../ProductCollections";
import ProductDescription from "../ProductDescription";
import ProductImages from "../ProductImages";
import ProductPriceAndAvailability from "../ProductPriceAndAvailability";
import ProductVariants from "../ProductVariants";

interface MoneyRangeType {
  start: string;
  stop: string;
}
interface ProductDetailsPageProps {
  placeholderImage: string;
  product?: {
    id: string;
    name: string;
    description: string;
    slug: string;
    grossMargin: MoneyRangeType;
    salePrice: MoneyRangeType;
    purchaseCost: MoneyRangeType;
    isPublished: boolean;
    isAvailable: boolean;
    collections: Array<{
      id: string;
      name: string;
    }>;
    images: Array<{
      id: string;
      alt: string;
      url: string;
      order: number;
    }>;
    variants: Array<{
      id: string;
      name: string;
      sku: string;
      availability: boolean;
      price: {
        grossLocalized: string;
      };
      grossMargin: string;
    }>;
  };
  onBack();
  onDelete();
  onEdit();
  onProductShow();
  onVariantShow(id: string);
  onCollectionShow(id: string);
  onProductPublish();
}

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

export const ProductDetailsPage = decorate<ProductDetailsPageProps>(
  ({
    classes,
    placeholderImage,
    product,
    onBack,
    onDelete,
    onEdit,
    onProductShow,
    onVariantShow,
    onCollectionShow,
    onProductPublish
  }) => (
    <div className={classes.root}>
      <div>
        <ProductDescription
          product={product}
          onBack={onBack}
          onDelete={onDelete}
          onEdit={onEdit}
          onShow={onProductShow}
        />
        <Hidden smDown>
          <ProductImages
            imageList={product ? product.images : null}
            placeholder={placeholderImage}
          />
        </Hidden>
      </div>
      <div>
        <ProductPriceAndAvailability
          onPublish={onProductPublish}
          grossMargin={product ? product.grossMargin : null}
          isAvailable={product ? product.isAvailable : null}
          purchaseCost={product ? product.purchaseCost : null}
          salePrice={product ? product.salePrice : null}
          isPublished={product ? product.isPublished : null}
        />
        <ProductCollections
          collections={product ? product.collections : null}
          onRowClick={onCollectionShow}
        />
      </div>
      <Hidden mdUp>
        <div>
          <ProductImages
            imageList={product ? product.images : null}
            placeholder={placeholderImage}
          />
        </div>
      </Hidden>
      <ProductVariants
        variants={product ? product.variants : null}
        onRowClick={onVariantShow}
      />
    </div>
  )
);
export default ProductDetailsPage;
