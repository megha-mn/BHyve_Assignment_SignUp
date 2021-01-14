import React, { Component } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../configUrl";
import PaginationComponent from '../../Components/PaginationComponent';

class UserSkillSelectionContainer extends Component {
  state = {
    skillArray: [],
  };

  componentDidMount = () => {
    axios.get(`${BASE_API_URL}/skills`).then(
      (response) => {
        this.setState({skillArray:response.data})
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  // handleChange = (value) => {
  //   debugger;
  //   this.setState({ page: value });
  // };

  render() {
    return(
    <div>
      <PaginationComponent skillsArray={this.state.skillArray}/>
    </div>
    )
  }
}

export default UserSkillSelectionContainer;








