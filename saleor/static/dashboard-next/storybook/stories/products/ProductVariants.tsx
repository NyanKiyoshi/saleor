import { storiesOf } from "@storybook/react";
import * as React from "react";

import ProductVariants from "../../../product/components/ProductVariants";

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

storiesOf("Products / ProductVariants", module)
  .add("when loading data", () => <ProductVariants />)
  .add("when product has no variants", () => <ProductVariants variants={[]} />)
  .add("when product has variants", () => (
    <ProductVariants variants={variants} />
  ))
  .add("with clickable rows", () => (
    <ProductVariants variants={variants} onRowClick={() => {}} />
  ));
