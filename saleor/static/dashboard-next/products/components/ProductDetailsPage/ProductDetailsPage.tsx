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
    collections: {
      edges: Array<{
        node: {
          id: string;
          name: string;
        };
      }>;
    };
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
          id={product ? product.id : null}
          name={product ? product.name : null}
          description={product ? product.description : null}
          url={product ? product.url : null}
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
          grossMargin={product ? product.grossMargin[0] : null}
          isAvailable={product ? product.availability.available : null}
          purchaseCost={
            product
              ? {
                  start: product.purchaseCost.start.gross.localized,
                  stop: product.purchaseCost.stop.gross.localized
                }
              : null
          }
          salePrice={
            product
              ? {
                  start: product.priceRange.start.net.localized,
                  stop: product.priceRange.stop.net.localized
                }
              : null
          }
          isPublished={product ? product.isPublished : null}
        />
        <ProductCollections
          collections={
            product ? product.collections.edges.map(edge => edge.node) : null
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
