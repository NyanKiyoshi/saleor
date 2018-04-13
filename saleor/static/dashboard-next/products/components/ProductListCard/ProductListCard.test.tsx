import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";

import { products } from "../../fixtures";
import ProductListCard from "./ProductListCard";

describe("<ProductListCard />", () => {
  it("renders with initial data", () => {
    const component = renderer.create(
      <ProductListCard
        hasNextPage={true}
        hasPreviousPage={false}
        products={products}
        onFilter={jest.fn()}
        onNextPage={jest.fn()}
        onPreviousPage={jest.fn()}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders with clickable rows", () => {
    const component = renderer.create(
      <ProductListCard
        hasNextPage={true}
        hasPreviousPage={false}
        products={products}
        onFilter={jest.fn()}
        onNextPage={jest.fn()}
        onPreviousPage={jest.fn()}
        onRowClick={jest.fn()}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders without initial data", () => {
    const component = renderer.create(
      <ProductListCard
        hasNextPage={true}
        hasPreviousPage={false}
        products={[]}
        onFilter={jest.fn()}
        onNextPage={jest.fn()}
        onPreviousPage={jest.fn()}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders when loading data", () => {
    const component = renderer.create(
      <ProductListCard
        hasNextPage={true}
        hasPreviousPage={false}
        onFilter={jest.fn()}
        onNextPage={jest.fn()}
        onPreviousPage={jest.fn()}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
