import React from "react";
import { shallow } from "enzyme";
import DisplayProfileContainer from "./DisplayProfileContainer";

describe("DisplayProfileContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DisplayProfileContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
