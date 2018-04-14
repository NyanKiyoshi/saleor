import * as React from "react";
import * as renderer from "react-test-renderer";

import { variants } from "../../fixtures";
import ProductVariants from "./";

describe("<ProductVariants />", () => {
  it("renders when loading data", () => {
    const component = renderer.create(<ProductVariants />);
    expect(component).toMatchSnapshot();
  });
  it("renders when product has no variants", () => {
    const component = renderer.create(<ProductVariants variants={[]} />);
    expect(component).toMatchSnapshot();
  });
  it("renders when product has variants", () => {
    const component = renderer.create(<ProductVariants variants={variants} />);
    expect(component).toMatchSnapshot();
  });
  it("renders when product has variants and has clickable rows", () => {
    const component = renderer.create(
      <ProductVariants variants={variants} onRowClick={jest.fn()} />
    );
    expect(component).toMatchSnapshot();
  });
});
