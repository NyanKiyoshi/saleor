import Card, { CardContent } from "material-ui/Card";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import * as React from "react";

import PageHeader from "../../../components/PageHeader";
import i18n from "../../../i18n";

interface ProductDetailsFormProps {
  currencySymbol?: string;
  description?: string;
  loading?: boolean;
  name?: string;
  price?: number;
  onBack();
}

const decorate = withStyles({
  root: {
    gridTemplateColumns: "1fr 10rem"
  }
});

export const ProductDetailsForm = decorate<ProductDetailsFormProps>(
  ({ classes, currencySymbol, name, price, description, loading, onBack }) => (
    <Card>
      <PageHeader title={i18n.t("Edit product")} onBack={onBack} />
      <CardContent>
        <div className={classes.root}>
          <TextField disabled={loading} value={name} fullWidth />
          <TextField disabled={loading} value={price} />
        </div>
        <TextField multiline disabled={loading} value={description} />
      </CardContent>
    </Card>
  )
);
export default ProductDetailsForm;
