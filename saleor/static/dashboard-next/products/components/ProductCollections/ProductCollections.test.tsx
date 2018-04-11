import * as React from "react";
import * as renderer from "react-test-renderer";

import ProductCollections from "./";

const collections = [
  { id: "1", name: "Winter collection" },
  { id: "2", name: "Emperor's choice" }
];

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
