import React from "react";
import { shallow } from "enzyme";
import SignUpContainer from "./SignUpContainer";

describe("SignUpContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SignUpContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
