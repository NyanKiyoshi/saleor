import * as React from "react";
import * as renderer from "react-test-renderer";

import { product } from "../../fixtures";
import ProductDetailsPage from "./";

const placeholder = "/url/to/image.png";

describe("<ProductDetailsPage />", () => {
  it("renders when loading data", () => {
    const component = renderer.create(
      <ProductDetailsPage
        placeholderImage={placeholder}
        onBack={() => {}}
        onCollectionShow={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        onProductPublish={() => {}}
        onProductShow={() => {}}
        onVariantShow={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders with data", () => {
    const component = renderer.create(
      <ProductDetailsPage
        product={product}
        placeholderImage={placeholder}
        onBack={() => {}}
        onCollectionShow={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        onProductPublish={() => {}}
        onProductShow={() => {}}
        onVariantShow={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
