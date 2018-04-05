import { storiesOf } from "@storybook/react";
import * as React from "react";

import ProductCollections from "../../../product/components/ProductCollections";

const collections = [
  { id: "1", name: "Winter collection" },
  { id: "2", name: "Emperor's choice" }
];

storiesOf("Products / ProductCollections", module)
  .add("with no collections", () => (
    <ProductCollections collections={[]} onRowClick={() => {}} />
  ))
  .add("with collections", () => (
    <ProductCollections collections={collections} onRowClick={() => {}} />
  ));
