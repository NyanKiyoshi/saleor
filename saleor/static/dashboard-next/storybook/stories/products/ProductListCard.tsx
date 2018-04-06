import { storiesOf } from "@storybook/react";
import * as React from "react";

import * as placeholder from "../../../../images/placeholder255x255.png";
import ProductListCard from "../../../product/components/ProductListCard";

const images = [
  {
    id: "2",
    alt: "Image 2",
    url: placeholder as string,
    order: 2
  },
  {
    id: "1",
    alt: "Image 1",
    url: placeholder as string,
    order: 1
  }
];

const products = [
  {
    id: "UHJvZHVjdDox",
    name: "Gardner, Graham and King",
    thumbnailUrl: placeholder,
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  },
  {
    id: "UHJvZHVjdDoy",
    name: "Gardner, Graham and King",
    thumbnailUrl: placeholder,
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  },
  {
    id: "UHJvZHVjdDoz",
    name: "Gardner, Graham and King",
    thumbnailUrl: placeholder,
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  },
  {
    id: "UHJvZHVjdDoa",
    name: "Gardner, Graham and King",
    thumbnailUrl: placeholder,
    productType: {
      id: "1",
      name: "T-Shirt"
    }
  }
];

storiesOf("Products / ProductListCard", module)
  .add("without initial data", () => (
    <ProductListCard
      hasNextPage={true}
      hasPreviousPage={false}
      products={[]}
      onCreate={() => {}}
      onFilter={() => {}}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
    />
  ))
  .add("with initial data", () => (
    <ProductListCard
      hasNextPage={true}
      hasPreviousPage={false}
      products={products}
      onCreate={() => {}}
      onFilter={() => {}}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
    />
  ))
  .add("with clickable rows", () => (
    <ProductListCard
      hasNextPage={true}
      hasPreviousPage={false}
      products={products}
      onCreate={() => {}}
      onFilter={() => {}}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
      onRowClick={() => {}}
    />
  ))
  .add("when loading data", () => (
    <ProductListCard
      hasNextPage={true}
      hasPreviousPage={false}
      onCreate={() => {}}
      onFilter={() => {}}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
    />
  ));
