import Card from "material-ui/Card";
import Drawer from "material-ui/Drawer";
import Hidden from "material-ui/Hidden";
import { withStyles } from "material-ui/styles";
import { stringify as stringifyQs } from "qs";
import * as React from "react";
// import {Query} from 'react-apollo'

import { productShowUrl } from "..";
import { ProductFilters } from "../../category/components/ProductFilters";
import Navigator from "../../components/Navigator";
import Toggle from "../../components/Toggle";
import ProductListCard from "../components/ProductListCard";

interface ProductListProps {
  filters: any;
}

// TODO: Replace when API is ready
const productList = [
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjA=",
    node: {
      id: "UHJvZHVjdDozNQ==",
      name: "Arroyo and Sons",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/candy/2_QQHBQc7-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "4",
        name: "Candy",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjE=",
    node: {
      id: "UHJvZHVjdDoyMw==",
      name: "Diaz, Adams and Shelton",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/coffee/coffee-04_Prs72Dk-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "3",
        name: "Coffee",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjI=",
    node: {
      id: "UHJvZHVjdDozNA==",
      name: "Davis Group",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/candy/2_dizYqCn-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "4",
        name: "Candy",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjM=",
    node: {
      id: "UHJvZHVjdDozNg==",
      name: "Ritter-Weber",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/candy/1_9lezPG8-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "4",
        name: "Candy",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjQ=",
    node: {
      id: "UHJvZHVjdDozOQ==",
      name: "Obrien, Ellis and Marks",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/candy/2_YsqWwfJ-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "4",
        name: "Candy",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjU=",
    node: {
      id: "UHJvZHVjdDozNw==",
      name: "Gonzalez-Gonzalez",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/candy/2_HdpF68z-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "4",
        name: "Candy",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjY=",
    node: {
      id: "UHJvZHVjdDozOA==",
      name: "Morgan Group",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/candy/2_DM9os0n-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "4",
        name: "Candy",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjc=",
    node: {
      id: "UHJvZHVjdDoyOQ==",
      name: "Jones Inc",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/coffee/8_dJqg8nJ-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "3",
        name: "Coffee",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjg=",
    node: {
      id: "UHJvZHVjdDoyNA==",
      name: "Rubio, Murphy and Woodard",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/coffee/8_PlCFs9g-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "3",
        name: "Coffee",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjk=",
    node: {
      id: "UHJvZHVjdDo0MA==",
      name: "Hickman-Garcia",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/candy/1_2NZ5JGK-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "4",
        name: "Candy",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjEw",
    node: {
      id: "UHJvZHVjdDozMQ==",
      name: "Ochoa PLC",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/candy/1_9Fe7vhq-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "4",
        name: "Candy",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  },
  {
    cursor: "YXJyYXljb25uZWN0aW9uOjEx",
    node: {
      id: "UHJvZHVjdDoyMQ==",
      name: "Hall-Harris",
      thumbnailUrl:
        "/media/__sized__/products/saleor/static/placeholders/coffee/coffee-03_RYXhsDS-crop-c0-5__0-5-255x255-70.jpg",
      productType: {
        id: "3",
        name: "Coffee",
        __typename: "ProductType"
      },
      __typename: "Product"
    },
    __typename: "ProductCountableEdge"
  }
];

// TODO: Replace when API is ready
const dummyProductTypes = [
  { id: "123123123", name: "Type 1" },
  { id: "123123124", name: "Type 2" },
  { id: "123123125", name: "Type 3" },
  { id: "123123126", name: "Type 4" }
];

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
export const ProductList = decorate<ProductListProps>(
  ({ classes, filters }) => (
    <div className={classes.root}>
      <Navigator>
        {navigate => {
          const applyFilters = data => {
            navigate(`?${stringifyQs({ ...filters, ...data.formData })}`, true);
          };
          const clearFilters = () => navigate("?");
          return (
            <Toggle>
              {(
                filtersVisible,
                { disable: hideFilters, enable: showFilters }
              ) => (
                <>
                  <div>
                    <ProductListCard
                      products={productList.map(p => p.node)}
                      onFilter={showFilters}
                      // TODO: Replace when API is ready
                      onNextPage={() => {}}
                      onPreviousPage={() => {}}
                      onRowClick={id => () => navigate(productShowUrl(id))}
                    />
                  </div>
                  <div>
                    <Hidden smDown implementation="css">
                      <ProductFilters
                        handleSubmit={applyFilters}
                        handleClear={clearFilters}
                        productTypes={dummyProductTypes}
                        formState={filters}
                      />
                    </Hidden>
                    <Hidden mdUp implementation="css">
                      <Drawer
                        open={filtersVisible}
                        onClose={hideFilters}
                        anchor="bottom"
                      >
                        <ProductFilters
                          handleSubmit={applyFilters}
                          handleClear={clearFilters}
                          productTypes={dummyProductTypes}
                          formState={filters}
                        />
                      </Drawer>
                    </Hidden>
                  </div>
                </>
              )}
            </Toggle>
          );
        }}
      </Navigator>
    </div>
  )
);
export default ProductList;
