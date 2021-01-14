import React from "react";
import { shallow } from "enzyme";
import ProfileDetailsContainer from "./ProfileDetailsContainer";

describe("ProfileDetailsContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProfileDetailsContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
