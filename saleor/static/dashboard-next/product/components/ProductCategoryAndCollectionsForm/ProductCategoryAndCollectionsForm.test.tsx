import * as React from "react";
import * as renderer from "react-test-renderer";

import ProductCategoryAndCollectionsForm from "../../../product/components/ProductCategoryAndCollectionsForm";

const category = "876752";
const collections = [
  { value: "1", label: "Winter collection" },
  { value: "2", label: "Emperor's choice" }
];
const categories = [
  {
    value: "123123",
    label: "Lorem ipsum dolor"
  },
  {
    value: "876752",
    label: "Mauris vehicula tortor vulputate"
  }
];
const productCollections = ["1"];

describe("<ProductCategoryAndCollectionsForm />", () => {
  it("renders while loading data", () => {
    const component = renderer.create(
      <ProductCategoryAndCollectionsForm onChange={() => {}} loading={true} />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders with data loaded", () => {
    const component = renderer.create(
      <ProductCategoryAndCollectionsForm
        onChange={() => {}}
        collections={collections}
        categories={categories}
        category={category}
        productCollections={productCollections}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
