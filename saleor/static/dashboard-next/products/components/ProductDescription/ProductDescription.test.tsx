import * as React from "react";
import * as renderer from "react-test-renderer";

import { product } from "../../fixtures";
import ProductDescription from "./";

describe("<ProductDescription />", () => {
  it("renders when loading data", () => {
    const component = renderer.create(
      <ProductDescription
        onBack={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        onShow={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders with no description", () => {
    const component = renderer.create(
      <ProductDescription
        id={product.id}
        name={product.name}
        url={product.url}
        description={""}
        onBack={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        onShow={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders with full data", () => {
    const component = renderer.create(
      <ProductDescription
        id={product.id}
        name={product.name}
        url={product.url}
        description={product.description}
        onBack={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        onShow={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
