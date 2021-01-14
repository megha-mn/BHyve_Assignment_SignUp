import React from "react";
import { shallow } from "enzyme";
import CheckBoxComponent from "./CheckBoxComponent";

describe("CheckBoxComponent", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CheckBoxComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
