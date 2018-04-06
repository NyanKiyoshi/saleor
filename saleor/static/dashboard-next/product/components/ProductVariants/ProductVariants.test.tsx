import * as React from "react";
import * as renderer from "react-test-renderer";

import ProductVariants from "./";

const variants = [
  {
    id: "1",
    name: "XS",
    sku: "abc123",
    availability: true,
    price: { grossLocalized: "10 $" },
    grossMargin: "5 %"
  },
  {
    id: "2",
    name: "S",
    sku: "abc124",
    availability: true,
    price: { grossLocalized: "10 $" },
    grossMargin: "5 %"
  },
  {
    id: "3",
    name: "M",
    sku: "abc125",
    availability: false,
    price: { grossLocalized: "11 $" },
    grossMargin: "6 %"
  },
  {
    id: "4",
    name: "L",
    sku: "abc126",
    availability: true,
    price: { grossLocalized: "12 $" },
    grossMargin: "6 %"
  }
];

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
