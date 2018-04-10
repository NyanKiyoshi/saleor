import { withStyles } from "material-ui/styles";
import * as React from "react";

import Form from "../../../components/Form";
import SeoForm from "../../../components/SeoForm";
import ProductAttributesForm from "../ProductAttributesForm";
import ProductAvailabilityForm from "../ProductAvailabilityForm";
import ProductCategoryAndCollectionsForm from "../ProductCategoryAndCollectionsForm";
import ProductDetailsForm from "../ProductDetailsForm";

interface ProductUpdateProps {
  collections?: any[];
  categories?: any[];
  loading?: boolean;
  // TODO: Type it when done
  product?: any;
  onBack();
  onSubmit();
}

const decorate = withStyles(theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: theme.breakpoints.width("md")
    }
  },
  grid: {
    gridGap: theme.spacing.unit * 2 + "px",
    display: "grid",
    gridTemplateColumns: "3fr 2fr",
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing.unit,
      gridGap: theme.spacing.unit + "px"
    }
  },
  cardContainer: {
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing.unit
    }
  }
}));
export const ProductUpdate = decorate<ProductUpdateProps>(
  ({
    classes,
    loading,
    categories,
    collections,
    product,
    onBack,
    onSubmit
  }) => (
    <div className={classes.root}>
      <Form onSubmit={onSubmit}>
        {({ change, data, submit }) => (
          <>
            <ProductDetailsForm
              onBack={onBack}
              onChange={change}
              name={loading ? "" : product.name}
              description={loading ? "" : product.description}
              currencySymbol={loading ? "" : product.price.currencySymbol}
              price={loading ? "" : product.price.net}
              loading={loading}
            />
            <div className={classes.grid}>
              <div>
                <ProductAvailabilityForm
                  available={loading ? "" : product.available}
                  availableOn={loading ? "" : product.availableOn}
                  onChange={change}
                />
                <div className={classes.cardContainer}>
                  <SeoForm
                    title={loading ? "" : product.seo.title}
                    description={loading ? "" : product.seo.description}
                    storefrontUrl={
                      loading
                        ? ""
                        : `http://demo.getsaleor.com/product/${product.slug}`
                    }
                    loading={loading}
                    onClick={() => {}}
                    onChange={change}
                  />
                </div>
              </div>
              <div>
                <ProductCategoryAndCollectionsForm
                  category={loading ? "" : product.category}
                  categories={categories.map(category => ({
                    label: category.name,
                    value: category.id
                  }))}
                  productCollections={product.collection}
                  collections={collections.map(collection => ({
                    label: collection.name,
                    value: collection.id
                  }))}
                  loading={loading}
                  onChange={change}
                />
                <div className={classes.cardContainer}>
                  <ProductAttributesForm
                    attributes={
                      loading
                        ? []
                        : product.productType.productAttributes.edges.map(
                            edge => edge.node
                          )
                    }
                    productAttributes={loading ? [] : product.attributes}
                    loading={loading}
                    onChange={change}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </Form>
    </div>
  )
);
export default ProductUpdate;
