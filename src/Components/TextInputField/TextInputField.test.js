import React from "react";
import { shallow } from "enzyme";
import TextInputField from "./TextInputField";

describe("TextInputField", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TextInputField />);
    expect(wrapper).toMatchSnapshot();
  });
});
