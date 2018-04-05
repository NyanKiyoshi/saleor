import { storiesOf } from "@storybook/react";
import * as React from "react";

import ProductDescription from "../../../product/components/ProductDescription";

const product = {
  id: "1",
  name: "Our totally awesome book",
  description:
    "Aenean sit amet malesuada nibh. Proin nisi lorem, facilisis at tortor vel, convallis ornare nibh. In nec ipsum porta, varius leo eu, condimentum quam. Donec gravida euismod ipsum, at consequat orci efficitur nec. Phasellus lectus arcu, auctor eget porttitor eget, venenatis a lacus. Suspendisse quis urna rhoncus, commodo justo at, tempor nisl.",
  slug: "awesome-book"
};
const productWithoutDescription = {
  id: "2",
  name: "Our totally awesome cup",
  description: "",
  slug: "awesome-cup"
};

storiesOf("Products / ProductDescription", module)
  .add("with no description", () => (
    <ProductDescription
      product={productWithoutDescription}
      onBack={() => {}}
      onDelete={() => {}}
      onEdit={() => {}}
      onShow={() => {}}
    />
  ))
  .add("with description", () => (
    <ProductDescription
      product={product}
      onBack={() => {}}
      onDelete={() => {}}
      onEdit={() => {}}
      onShow={() => {}}
    />
  ))
  .add("when loading data", () => (
    <ProductDescription
      onBack={() => {}}
      onDelete={() => {}}
      onEdit={() => {}}
      onShow={() => {}}
    />
  ));
