import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";

import ProductListCard from "./ProductListCard";

const products = [
  {
    id: "UHJvZHVjdDox",
    name: "Gardner, Graham and King",
    thumbnailUrl:
      "/media/__sized__/products/saleor/static/placeholders/t-shirts/6_tdo7a5D-crop-c0-5__0-5-255x255-70.jpg",
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  },
  {
    id: "UHJvZHVjdDoy",
    name: "Gardner, Graham and King",
    thumbnailUrl:
      "/media/__sized__/products/saleor/static/placeholders/t-shirts/6_tdo7a5D-crop-c0-5__0-5-255x255-70.jpg",
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  },
  {
    id: "UHJvZHVjdDoz",
    name: "Gardner, Graham and King",
    thumbnailUrl:
      "/media/__sized__/products/saleor/static/placeholders/t-shirts/6_tdo7a5D-crop-c0-5__0-5-255x255-70.jpg",
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  },
  {
    id: "UHJvZHVjdDoa",
    name: "Gardner, Graham and King",
    thumbnailUrl:
      "/media/__sized__/products/saleor/static/placeholders/t-shirts/6_tdo7a5D-crop-c0-5__0-5-255x255-70.jpg",
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  }
];

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
