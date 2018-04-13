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
import Skeleton from "../../../components/Skeleton";
import i18n from "../../../i18n";

interface ProductPriceAndAvailabilityProps {
  grossMargin?: Array<{
    start: number;
    stop: number;
  }>;
  salePrice?: {
    start: {
      net: {
        localized: string;
      };
    };
    stop: {
      net: {
        localized: string;
      };
    };
  };
  purchaseCost?: {
    start: {
      gross: {
        localized: string;
      };
    };
    stop: {
      gross: {
        localized: string;
      };
    };
  };
  isPublished?: boolean;
  isAvailable?: boolean;
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
>(
  ({
    classes,
    grossMargin,
    salePrice,
    purchaseCost,
    isPublished,
    isAvailable,
    onPublish
  }) => (
    <Card>
      <CardContent>
        <ControlledSwitch
          onChange={onPublish}
          uncheckedLabel={
            isPublished === undefined || isPublished === null
              ? " "
              : i18n.t("Draft")
          }
          label={i18n.t("Published")}
          checked={!(isPublished === undefined || isPublished === null)}
          disabled={isPublished === undefined || isPublished === null}
        />
        <Typography>
          {isAvailable === undefined || isAvailable === null ? (
            <Skeleton />
          ) : isAvailable ? (
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
              {salePrice ? (
                <span>
                  {salePrice.start.net.localized} -{" "}
                  {salePrice.stop.net.localized}
                </span>
              ) : (
                <Skeleton />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.leftCell}>
              {i18n.t("Purchase cost")}
            </TableCell>
            <TableCell className={classes.rightCell}>
              {purchaseCost ? (
                <span>
                  {purchaseCost.start.gross.localized} -{" "}
                  {purchaseCost.stop.gross.localized}
                </span>
              ) : (
                <Skeleton />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.leftCell}>
              {i18n.t("Gross margin")}
            </TableCell>
            <TableCell className={classes.rightCell}>
              {grossMargin ? (
                <span>
                  {grossMargin[0].start}% - {grossMargin[0].stop}%
                </span>
              ) : (
                <Skeleton />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
);
ProductPriceAndAvailability.displayName = "ProductPriceAndAvailability";
export default ProductPriceAndAvailability;
