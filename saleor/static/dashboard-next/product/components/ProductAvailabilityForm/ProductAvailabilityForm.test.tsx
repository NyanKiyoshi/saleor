import * as React from "react";
import * as renderer from "react-test-renderer";

import ProductAvailabilityForm from "./ProductAvailabilityForm";

describe("<ProductAvailabilityForm />", () => {
  it("renders when loading data", () => {
    const component = renderer.create(
      <ProductAvailabilityForm onChange={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders with loaded data", () => {
    const component = renderer.create(
      <ProductAvailabilityForm
        onChange={() => {}}
        available={true}
        availableOn={"14-29-2019"}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
