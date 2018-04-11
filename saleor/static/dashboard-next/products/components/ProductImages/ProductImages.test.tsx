import * as React from "react";
import * as renderer from "react-test-renderer";

import ProductImages from "./";

const placeholder = "url/to/image.png";
const images = [
  {
    id: "2",
    alt: "Image 2",
    url: placeholder,
    order: 2
  },
  {
    id: "1",
    alt: "Image 1",
    url: placeholder,
    order: 1
  }
];

describe("<ProductImages />", () => {
  it("renders without data", () => {
    const component = renderer.create(<ProductImages imageList={[]} />);
    expect(component).toMatchSnapshot();
  });
  it("renders with data", () => {
    const component = renderer.create(<ProductImages imageList={images} />);
    expect(component).toMatchSnapshot();
  });
  it("renders when loading data", () => {
    const component = renderer.create(<ProductImages />);
    expect(component).toMatchSnapshot();
  });
});
