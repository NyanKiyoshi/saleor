import Card from "material-ui/Card";
import * as React from "react";

import FilterListIcon from "material-ui-icons/FilterList";
import Hidden from "material-ui/Hidden";
import IconButton from "material-ui/IconButton";
import PageHeader from "../../../components/PageHeader";
import ProductList from "../../../components/ProductList";
import i18n from "../../../i18n";

interface ProductListCardProps {
  loading?: boolean;
  products: Array<{
    id: string;
    name: string;
    productType: {
      name: string;
    };
    thumbnailUrl: string;
  }>;
  onFilter();
  onNextPage();
  onPreviousPage();
  onRowClick?(id: string);
}

export const ProductListCard: React.StatelessComponent<
  ProductListCardProps
> = ({
  loading,
  products,
  onFilter,
  onNextPage,
  onPreviousPage,
  onRowClick
}) => (
  <Card>
    <PageHeader title={i18n.t("Product list")}>
      <Hidden mdUp>
        <IconButton disabled={loading} onClick={onFilter}>
          <FilterListIcon />
        </IconButton>
      </Hidden>
    </PageHeader>
    <ProductList
      products={products}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      onRowClick={onRowClick}
    />
  </Card>
);

export default ProductListCard;
