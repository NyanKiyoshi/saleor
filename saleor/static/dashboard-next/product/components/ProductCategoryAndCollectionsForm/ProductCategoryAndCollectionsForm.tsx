import Card, { CardContent } from "material-ui/Card";
import { withStyles } from "material-ui/styles";
import * as React from "react";

import FormSpacer from "../../../components/FormSpacer";
import MultiSelectField from "../../../components/MultiSelectField";
import SingleSelectField from "../../../components/SingleSelectField";
import i18n from "../../../i18n";

interface ProductCategoryAndCollectionsFormProps {
  categories: any[];
  collections: any[];
  productCollections: any[];
  category: any;
  loading?: boolean;
  onChange(event: any);
}

const decorate = withStyles(theme => ({}));
const ProductCategoryAndCollectionsForm = decorate<
  ProductCategoryAndCollectionsFormProps
>(
  ({
    classes,
    categories,
    collections,
    productCollections,
    category,
    loading,
    onChange
  }) => (
    <Card>
      <CardContent>
        <SingleSelectField
          disabled={loading}
          label={i18n.t("Category")}
          choices={categories}
          name="category"
          value={category}
          onChange={onChange}
        />
        <FormSpacer />
        <MultiSelectField
          disabled={loading}
          label={i18n.t("Collections")}
          choices={collections}
          name="collections"
          value={productCollections}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  )
);
export default ProductCategoryAndCollectionsForm;
