import Card, { CardContent } from "material-ui/Card";
import blue from "material-ui/colors/blue";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";
import { FormControlLabel } from "material-ui/Form";
import Hidden from "material-ui/Hidden";
import { withStyles } from "material-ui/styles";
import Switch from "material-ui/Switch";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Typography from "material-ui/Typography";
import * as React from "react";

import PageHeader from "../../../components/PageHeader";
import i18n from "../../../i18n";

interface ProductVariantsProps {
  variants: Array<{
    id: string;
    name: string;
    sku: string;
    availability: boolean;
    price: {
      grossLocalized: string;
    };
    grossMargin: string;
  }>;
  onRowClick(id: string);
}

const decorate = withStyles(theme => ({
  alignRightText: {
    textAlign: "right"
  },
  greenText: {
    color: green[500]
  },
  link: {
    color: blue[500],
    cursor: "pointer"
  },
  redText: {
    color: red[500]
  }
}));
export const ProductVariants = decorate<ProductVariantsProps>(
  ({ classes, variants, onRowClick }) => (
    <Card>
      <PageHeader title={i18n.t("Variants")} />
      <Table>
        <TableHead>
          <TableRow>
            <Hidden mdDown>
              <TableCell>{i18n.t("SKU")}</TableCell>
            </Hidden>
            <TableCell>{i18n.t("Name")}</TableCell>
            <TableCell>{i18n.t("Status")}</TableCell>
            <Hidden mdDown>
              <TableCell className={classes.alignRightText}>
                {i18n.t("Price")}
              </TableCell>
              <TableCell className={classes.alignRightText}>
                {i18n.t("Gross margin")}
              </TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.map(variant => (
            <TableRow key={variant.id}>
              <Hidden mdDown>
                <TableCell>{variant.sku}</TableCell>
              </Hidden>
              <TableCell
                className={classes.link}
                onClick={onRowClick(variant.id)}
              >
                {variant.name}
              </TableCell>
              <TableCell
                className={
                  variant.availability ? classes.greenText : classes.redText
                }
              >
                {variant.availability
                  ? i18n.t("Available")
                  : i18n.t("Unavailable")}
              </TableCell>
              <Hidden mdDown>
                <TableCell className={classes.alignRightText}>
                  {variant.price.grossLocalized}
                </TableCell>
                <TableCell className={classes.alignRightText}>
                  {variant.grossMargin}
                </TableCell>
              </Hidden>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
);
export default ProductVariants;
