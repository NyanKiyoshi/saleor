import { storiesOf } from "@storybook/react";
import * as React from "react";

import ProductImages from "../../../product/components/ProductImages";
import * as placeholder from "../../../../images/placeholder255x255.png";

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

storiesOf("Products / ProductImages", module)
  .add("without data", () => <ProductImages imageList={[]} />)
  .add("with data", () => <ProductImages imageList={images} />)
  .add("when loading data", () => <ProductImages />);
