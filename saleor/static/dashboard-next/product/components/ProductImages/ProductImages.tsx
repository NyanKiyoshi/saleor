import InfoIcon from "material-ui-icons/Info";
import Card, { CardContent } from "material-ui/Card";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import Subheader from "material-ui/List/ListSubheader";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import * as React from "react";

import { CircularProgress } from "material-ui/Progress";
import PageHeader from "../../../components/PageHeader";
import i18n from "../../../i18n";

interface ProductImagesProps {
  imageList?: Array<{
    id: string;
    alt: string;
    url: string;
    order: number;
  }>;
}

const decorate = withStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridColumnGap: `${theme.spacing.unit * 2}px`,
    gridRowGap: `${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)"
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)"
    }
  },
  card: {
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      marginTop: 0
    }
  },
  gridElement: {
    "& img": {
      width: "100%"
    }
  }
}));

export const ProductImages = decorate<ProductImagesProps>(
  ({ classes, imageList }) => (
    <Card className={classes.card}>
      <PageHeader title={i18n.t("Images")} />
      <CardContent>
        <div className={classes.root}>
          {imageList === undefined || imageList === null ? (
            <CircularProgress />
          ) : imageList.length > 0 ? (
            imageList
              .sort((prev, next) => (prev.order > next.order ? 1 : -1))
              .map(tile => (
                <GridListTile
                  key={tile.id}
                  className={classes.gridElement}
                  component="div"
                >
                  <img src={tile.url} alt={tile.alt} />
                  <GridListTileBar
                    title={tile.alt || i18n.t("No description")}
                  />
                </GridListTile>
              ))
          ) : (
            <Typography>{i18n.t("No images available")}</Typography>
          )}
        </div>
      </CardContent>
    </Card>
  )
);
export default ProductImages;
