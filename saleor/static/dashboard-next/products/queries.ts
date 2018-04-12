import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

import {
  ProductListQuery,
  ProductListQueryVariables,
  ProductDetailsQuery,
  ProductDetailsQueryVariables
} from "../gql-types";

export const TypedProductListQuery = Query as React.ComponentType<
  QueryProps<ProductListQuery, ProductListQueryVariables>
>;
export const productListQuery = gql`
  query ProductList($first: Int, $after: String, $last: Int, $before: String) {
    products(before: $before, after: $after, first: $first, last: $last) {
      edges {
        node {
          id
          name
          thumbnailUrl
          productType {
            id
            name
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export const TypedProductDetailsQuery = Query as React.ComponentType<
  QueryProps<ProductDetailsQuery, ProductDetailsQueryVariables>
>;
export const productDetailsQuery = gql`
  query ProductDetails($id: ID!) {
    product(id: $id) {
      edges {
        node {
          id
          name
          thumbnailUrl
          productType {
            id
            name
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
