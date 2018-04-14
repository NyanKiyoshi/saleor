import * as React from "react";
import * as renderer from "react-test-renderer";

import ProductDetailsForm from "./";

const product = {
  id: "1",
  name: "Our totally awesome book",
  description:
    "Aenean sit amet malesuada nibh. Proin nisi lorem, facilisis at tortor vel, convallis ornare nibh. In nec ipsum porta, varius leo eu, condimentum quam. Donec gravida euismod ipsum, at consequat orci efficitur nec. Phasellus lectus arcu, auctor eget porttitor eget, venenatis a lacus. Suspendisse quis urna rhoncus, commodo justo at, tempor nisl.",
  slug: "awesome-book",
  currencySymbol: "USD",
  price: "300"
};

describe("<ProductDetailsForm />", () => {
  it("renders with no value", () => {
    const component = renderer.create(
      <ProductDetailsForm onBack={() => {}} onChange={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders with value", () => {
    const component = renderer.create(
      <ProductDetailsForm
        onBack={() => {}}
        onChange={() => {}}
        name={product.name}
        description={product.description}
        currencySymbol={product.currencySymbol}
        price={product.price}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders when loading data", () => {
    const component = renderer.create(
      <ProductDetailsForm
        onBack={() => {}}
        onChange={() => {}}
        loading={true}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
