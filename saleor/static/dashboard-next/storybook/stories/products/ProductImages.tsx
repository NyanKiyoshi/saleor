import { storiesOf } from "@storybook/react";
import * as React from "react";

import * as placeholder from "../../../../images/placeholder255x255.png";
import ProductImages from "../../../products/components/ProductImages";
import { images as imagesFixture } from "../../../products/fixtures";

const images = imagesFixture.map(image => ({ ...image, url: placeholder }));

storiesOf("Products / ProductImages", module)
  .add("without data", () => <ProductImages imageList={[]} />)
  .add("with data", () => <ProductImages imageList={images} />)
  .add("when loading data", () => <ProductImages placeholder={placeholder} />);
