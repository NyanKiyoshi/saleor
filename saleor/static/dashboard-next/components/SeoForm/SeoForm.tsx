import * as React from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";

import i18n from "../../i18n";
import PageHeader from "../PageHeader";

interface SeoFormProps {
  title: string;
  description: string;
  storefrontUrl: string;
  loading?: boolean;
  onClick();
  onChange(event: any);
}

const decorate = withStyles(theme => ({
  titleBar: {
    color: "#1a0dab",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: "21px",
    textDecoration: "none",
    wordWrap: "break-word",
    overflowWrap: "break-word"
  },
  addressBar: {
    color: "#006621",
    fontSize: "13px",
    lineHeight: "16px",
    whiteSpace: "nowrap",
    marginBottom: "2px",
    overflow: "hidden" as "hidden",
    textOverflow: "ellipsis"
  },
  descriptionBar: {
    color: "#545454",
    fontSize: "13px",
    lineHeight: "18px",
    overflowWrap: "break-word"
  }
}));
const SeoForm = decorate<SeoFormProps>(
  ({
    classes,
    title,
    description,
    storefrontUrl,
    loading,
    onClick,
    onChange
  }) => (
    <Card>
      <PageHeader title={i18n.t("SEO Preview Tools")} />
      <CardContent>
        <div>
          <Typography className={classes.titleBar} onClick={onClick}>
            {title}
          </Typography>
          <Typography className={classes.addressBar}>
            {storefrontUrl}
          </Typography>
          <Typography className={classes.descriptionBar}>
            {description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
);
export default SeoForm;
