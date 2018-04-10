import * as React from "react";
import Card, { CardContent } from "material-ui/Card";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";

import ControlledCheckbox from "../../../components//ControlledCheckbox";
import i18n from "../../../i18n";

interface ProductAvailabilityFormProps {
  available?: boolean;
  availableOn?: string;
  loading?: boolean;
  onChange(event: any);
}

const decorate = withStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr"
  }
}));
export const ProductAvailabilityForm = decorate<ProductAvailabilityFormProps>(
  ({ classes, available, availableOn, loading, onChange }) => (
    <Card>
      <CardContent className={classes.root}>
        <ControlledCheckbox
          name="available"
          label={i18n.t("available")}
          checked={available}
          onChange={onChange}
        />
        <TextField
          disabled={!available}
          name="availableOn"
          label={i18n.t("Available on", { context: "label" })}
          type="date"
          value={availableOn}
          onChange={onChange}
          InputLabelProps={{
            shrink: true
          }}
          // helperText={
          //   errorList && errorList.availableOn ? errorList.availableOn : ""
          // }
          // error={!!(errorList && errorList.availableOn)}
        />
      </CardContent>
    </Card>
  )
);
export default ProductAvailabilityForm;
