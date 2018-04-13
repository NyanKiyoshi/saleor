import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
import VisibilityIcon from "material-ui-icons/Visibility";
import Card, { CardContent } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import * as React from "react";

import PageHeader from "../../../components/PageHeader";
import Skeleton from "../../../components/Skeleton";
import i18n from "../../../i18n";

interface ProductDetailsCardProps {
  product?: {
    id: string;
    name: string;
    description: string;
    url: string;
  };
  onBack();
  onDelete();
  onEdit(id: string);
  onShow(url: string);
}

export const ProductDetailsCard: React.StatelessComponent<
  ProductDetailsCardProps
> = ({ onBack, onDelete, onEdit, onShow, product }) => (
  <Card>
    {product === undefined || product === null ? (
      <>
        <PageHeader onBack={onBack}>
          <IconButton onClick={() => {}} disabled>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => {}} disabled>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => {}} disabled>
            <DeleteIcon />
          </IconButton>
        </PageHeader>
        <CardContent>
          <Typography>
            <Skeleton />
          </Typography>
        </CardContent>
      </>
    ) : (
      <>
        <PageHeader title={product.name} onBack={onBack}>
          <IconButton onClick={onShow(product.url)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={onEdit(product.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </PageHeader>
        <CardContent>
          <Typography>
            {product.description
              ? product.description
              : i18n.t("No description")}
          </Typography>
        </CardContent>
      </>
    )}
  </Card>
);
export default ProductDetailsCard;
