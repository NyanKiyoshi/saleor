import * as React from "react";
import * as renderer from "react-test-renderer";

import ProductDetailsPage from "./";

const placeholder = "/url/to/image.png";
const product = {
  id: "1",
  name: "Our totally awesome book",
  description:
    "Aenean sit amet malesuada nibh. Proin nisi lorem, facilisis at tortor vel, convallis ornare nibh. In nec ipsum porta, varius leo eu, condimentum quam. Donec gravida euismod ipsum, at consequat orci efficitur nec. Phasellus lectus arcu, auctor eget porttitor eget, venenatis a lacus. Suspendisse quis urna rhoncus, commodo justo at, tempor nisl.",
  slug: "awesome-book",
  isPublished: true,
  isAvailable: true,
  collections: [
    { id: "1", name: "Winter collection" },
    { id: "2", name: "Emperor's choice" }
  ],
  images: [
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
  ],
  purchaseCost: {
    start: "30 $",
    stop: "40 $"
  },
  salePrice: {
    start: "30 $",
    stop: "40 $"
  },
  grossMargin: {
    start: "30 $",
    stop: "40 $"
  },
  variants: [
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
  ]
};

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
