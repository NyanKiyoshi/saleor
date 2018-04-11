import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

import { ProductListQuery, ProductListQueryVariables } from "../gql-types";

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
