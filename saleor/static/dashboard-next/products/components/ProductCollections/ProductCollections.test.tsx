import * as React from "react";
import * as renderer from "react-test-renderer";

import { collections } from "../../fixtures";
import ProductCollections from "./";

describe("<ProductCollections />", () => {
  it("renders when loading data", () => {
    const component = renderer.create(
      <ProductCollections onRowClick={jest.fn()} />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders with data loaded", () => {
    const component = renderer.create(
      <ProductCollections onRowClick={jest.fn()} collections={collections} />
    );
    expect(component).toMatchSnapshot();
  });
});
