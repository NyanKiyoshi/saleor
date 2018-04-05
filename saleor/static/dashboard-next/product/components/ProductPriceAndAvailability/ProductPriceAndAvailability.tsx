import Card, { CardContent } from "material-ui/Card";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";
import { FormControlLabel } from "material-ui/Form";
import { withStyles } from "material-ui/styles";
import Switch from "material-ui/Switch";
import Table, { TableBody, TableCell, TableRow } from "material-ui/Table";
import Typography from "material-ui/Typography";
import * as React from "react";

import ControlledSwitch from "../../../components/ControlledSwitch";
import i18n from "../../../i18n";

interface ProductPriceAndAvailabilityProps {
  product: {
    id: string;
    productType: {
      id: string;
    };
    name: string;
    description: string;
    category: {
      id: string;
    };
    price: {
      currency: string;
      amount: number;
      localized: string;
    };
    availableOn?: string;
    isPublished: boolean;
    attributes: string;
    updatedAt: string;
    availability: {
      available: boolean;
      onSale: boolean;
    };
    images: Array<{
      id: string;
      alt: string;
      url: string;
      order: number;
    }>;
  };
  onPublish(event: React.ChangeEvent<any>);
}

const decorate = withStyles(theme => ({
  greenText: {
    color: green[500]
  },
  leftCell: {
    paddingRight: theme.spacing.unit
  },
  redText: {
    color: red[500]
  },
  rightCell: {
    paddingLeft: theme.spacing.unit,
    textAlign: "right"
  }
}));
export const ProductPriceAndAvailability = decorate<
  ProductPriceAndAvailabilityProps
>(({ classes, product, onPublish }) => (
  <Card>
    <CardContent>
      <ControlledSwitch
        onChange={onPublish}
        uncheckedLabel={i18n.t("Draft")}
        label={i18n.t("Published")}
        checked={product.isPublished}
      />
      <Typography>
        {product.availability.available ? (
          <span className={classes.greenText}>{i18n.t("Available")}</span>
        ) : (
          <span className={classes.redText}>{i18n.t("Unavailable")}</span>
        )}
      </Typography>
    </CardContent>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className={classes.leftCell}>
            {i18n.t("Sale price")}
          </TableCell>
          <TableCell className={classes.rightCell}>
            {product.price.localized} - {product.price.localized}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.leftCell}>
            {i18n.t("Purchase cost")}
          </TableCell>
          <TableCell className={classes.rightCell}>
            {product.price.localized} - {product.price.localized}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.leftCell}>
            {i18n.t("Gross margin")}
          </TableCell>
          <TableCell className={classes.rightCell}>
            {product.price.localized} - {product.price.localized}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
));
export default ProductPriceAndAvailability;
