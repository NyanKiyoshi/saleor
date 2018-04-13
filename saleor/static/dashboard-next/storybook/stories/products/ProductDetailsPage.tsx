import { storiesOf } from "@storybook/react";
import * as React from "react";

import * as placeholder from "../../../../images/placeholder255x255.png";
import ProductDetailsPage from "../../../products/components/ProductDetailsPage";
import { product } from "../../../products/fixtures";

storiesOf("Products / ProductDetailsPage", module)
  .add("when loading data", () => (
    <ProductDetailsPage
      placeholderImage={placeholder}
      onBack={() => {}}
      onCollectionShow={() => {}}
      onDelete={() => {}}
      onEdit={() => {}}
      onProductPublish={() => {}}
      onProductShow={() => {}}
      onVariantShow={() => {}}
    />
  ))
  .add("when loaded data", () => (
    <ProductDetailsPage
      product={product}
      placeholderImage={placeholder}
      onBack={() => {}}
      onCollectionShow={() => {}}
      onDelete={() => {}}
      onEdit={() => {}}
      onProductPublish={() => {}}
      onProductShow={() => {}}
      onVariantShow={() => {}}
    />
  ));
