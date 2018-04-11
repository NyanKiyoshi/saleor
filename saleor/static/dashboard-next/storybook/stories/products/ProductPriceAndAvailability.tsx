import { storiesOf } from "@storybook/react";
import * as React from "react";

import ProductPriceAndAvailability from "../../../products/components/ProductPriceAndAvailability";

const grossMargin = {
  start: "30 $",
  stop: "40 $"
};
const salePrice = {
  start: "30 $",
  stop: "40 $"
};
const purchaseCost = {
  start: "30 $",
  stop: "40 $"
};
storiesOf("Products / ProductPriceAndAvailability", module)
  .add("when loading data", () => (
    <ProductPriceAndAvailability onPublish={() => {}} />
  ))
  .add("when product is available", () => (
    <ProductPriceAndAvailability
      onPublish={() => {}}
      grossMargin={grossMargin}
      salePrice={salePrice}
      purchaseCost={purchaseCost}
      isAvailable={true}
    />
  ))
  .add("when product is not available", () => (
    <ProductPriceAndAvailability
      onPublish={() => {}}
      grossMargin={grossMargin}
      salePrice={salePrice}
      purchaseCost={purchaseCost}
      isAvailable={false}
    />
  ));
