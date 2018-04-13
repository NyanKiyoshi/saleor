import Hidden from "material-ui/Hidden";
import { withStyles } from "material-ui/styles";
import * as React from "react";

import ProductCollections from "../ProductCollections";
import ProductDescription from "../ProductDescription";
import ProductImages from "../ProductImages";
import ProductPriceAndAvailability from "../ProductPriceAndAvailability";
import ProductVariants from "../ProductVariants";

interface ProductDetailsPageProps {
  placeholderImage: string;
  product?: {
    id: string;
    name: string;
    description: string;
    price: {
      localized: string;
    };
    grossMargin: Array<{
      start: number;
      stop: number;
    }>;
    purchaseCost: {
      start: {
        gross: {
          localized: string;
        };
      };
      stop: {
        gross: {
          localized: string;
        };
      };
    };
    priceRange: {
      start: {
        net: {
          localized: string;
        };
      };
      stop: {
        net: {
          localized: string;
        };
      };
    };
    isPublished: boolean;
    availability: {
      available: boolean;
    };
    images: {
      edges: Array<{
        node: {
          id: string;
          alt: string;
          order: number;
          url: string;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          sku: string;
          name: string;
          priceOverride: {
            localized: string;
          };
          stockQuantity: number;
        };
      }>;
    };
    productType: {
      id: string;
      name: string;
    };
    url: string;
  };
  onBack();
  onDelete();
  onEdit(id: string);
  onProductShow(url: string);
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
            imageList={
              product ? product.images.edges.map(edge => edge.node) : null
            }
            placeholder={placeholderImage}
          />
        </Hidden>
      </div>
      <div>
        <ProductPriceAndAvailability
          onPublish={onProductPublish}
          grossMargin={product ? product.grossMargin : null}
          isAvailable={product ? product.availability.available : null}
          purchaseCost={product ? product.purchaseCost : null}
          salePrice={product ? product.priceRange : null}
          isPublished={product ? product.isPublished : null}
        />
        <ProductCollections
          // TODO: replace with product.collections when API is ready
          collections={
            product
              ? [
                  { id: "1", name: "Winter collection" },
                  { id: "2", name: "Emperor's choice" }
                ]
              : null
          }
          onRowClick={onCollectionShow}
        />
      </div>
      <Hidden mdUp>
        <div>
          <ProductImages
            imageList={
              product ? product.images.edges.map(edge => edge.node) : null
            }
            placeholder={placeholderImage}
          />
        </div>
      </Hidden>
      <ProductVariants
        variants={
          product ? product.variants.edges.map(edge => edge.node) : null
        }
        fallbackPrice={product ? product.price.localized : ""}
        onRowClick={onVariantShow}
      />
    </div>
  )
);
export default ProductDetailsPage;
