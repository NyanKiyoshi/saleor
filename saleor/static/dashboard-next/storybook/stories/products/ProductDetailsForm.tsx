import { storiesOf } from "@storybook/react";
import * as React from "react";

import ProductDetailsForm from "../../../product/components/ProductDetailsForm";

const product = {
  id: "1",
  name: "Our totally awesome book",
  description:
    "Aenean sit amet malesuada nibh. Proin nisi lorem, facilisis at tortor vel, convallis ornare nibh. In nec ipsum porta, varius leo eu, condimentum quam. Donec gravida euismod ipsum, at consequat orci efficitur nec. Phasellus lectus arcu, auctor eget porttitor eget, venenatis a lacus. Suspendisse quis urna rhoncus, commodo justo at, tempor nisl.",
  slug: "awesome-book",
  currencySymbol: "USD"
};

storiesOf("Products / ProductDetailsForm", module)
  .add("with no initial data", () => <ProductDetailsForm onBack={() => {}} />)
  .add("with initial data", () => (
    <ProductDetailsForm
      onBack={() => {}}
      name={product.name}
      description={product.description}
      currencySymbol={product.currencySymbol}
    />
  ))
  .add("when loading data", () => (
    <ProductDetailsForm onBack={() => {}} loading={true} />
  ));
