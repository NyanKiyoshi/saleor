import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";

import { grossMargin, purchaseCost, salePrice } from "../../fixtures";
import ProductPriceAndAvailability from "./";

describe("<ProductPriceAndAvailability />", () => {
  it("renders when loading data", () => {
    const component = renderer.create(
      <ProductPriceAndAvailability onPublish={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders when product is available", () => {
    const component = renderer.create(
      <ProductPriceAndAvailability
        onPublish={() => {}}
        grossMargin={grossMargin}
        salePrice={salePrice}
        purchaseCost={purchaseCost}
        isAvailable={true}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders product is not available", () => {
    const component = renderer.create(
      <ProductPriceAndAvailability
        onPublish={() => {}}
        grossMargin={grossMargin}
        salePrice={salePrice}
        purchaseCost={purchaseCost}
        isAvailable={true}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
