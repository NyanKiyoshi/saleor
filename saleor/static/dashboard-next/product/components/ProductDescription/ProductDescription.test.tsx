import * as React from "react";
import * as renderer from "react-test-renderer";

import ProductDescription from "./";

const product = {
  id: "1",
  name: "Our totally awesome book",
  description:
    "Aenean sit amet malesuada nibh. Proin nisi lorem, facilisis at tortor vel, convallis ornare nibh. In nec ipsum porta, varius leo eu, condimentum quam. Donec gravida euismod ipsum, at consequat orci efficitur nec. Phasellus lectus arcu, auctor eget porttitor eget, venenatis a lacus. Suspendisse quis urna rhoncus, commodo justo at, tempor nisl.",
  slug: "awesome-book"
};
const productWithoutDescription = {
  id: "2",
  name: "Our totally awesome cup",
  description: "",
  slug: "awesome-cup"
};

describe("<ProductDescription />", () => {
  it("renders when loading data", () => {
    const component = renderer.create(
      <ProductDescription
        onBack={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        onShow={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders with no description", () => {
    const component = renderer.create(
      <ProductDescription
        onBack={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        onShow={() => {}}
        product={productWithoutDescription}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders with full data", () => {
    const component = renderer.create(
      <ProductDescription
        onBack={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        onShow={() => {}}
        product={product}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
