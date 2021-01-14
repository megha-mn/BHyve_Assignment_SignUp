import React from "react";
import { shallow } from "enzyme";
import UserSkillSelectionContainer from "./UserSkillSelectionContainer";

describe("UserSkillSelectionContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<UserSkillSelectionContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
