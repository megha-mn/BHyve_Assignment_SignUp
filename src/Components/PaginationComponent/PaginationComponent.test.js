import React from "react";
import { shallow } from "enzyme";
import PaginationComponent from "./PaginationComponent";

describe("PaginationComponent", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PaginationComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
