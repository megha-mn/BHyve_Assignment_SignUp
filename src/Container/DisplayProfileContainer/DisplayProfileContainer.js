import React, { Component } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../configUrl";

class DisplayProfileContainer extends Component {
  state = {
    accessToken: sessionStorage.getItem("token"),
    getResponseData : []
  };

  componentDidMount = () => {
    axios
      .get(`${BASE_API_URL}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.state.accessToken}`,
        },
      })
      .then(
        (response) => {
          this.setState({getResponseData:response.data})
        },
        (error) => {
          console.log("error", error);
        }
      );
  };

  render() {
    let skillSetValues = (this.state.getResponseData.skills)  && (this.state.getResponseData.skills).map((data, index) => {
      return(
        <span key={index}>{data},</span>
      )

    })
    return (
        <div >
          <h5 className="signInHeadingStyle">Your Profile Details</h5>
          <div className="input-group mb-3">
            <p>First Name : {this.state.getResponseData.firstName}</p>
          </div>
          <div className="input-group mb-3">
            <p>Last Name : {this.state.getResponseData.lastName}</p>
          </div>
          <div className="input-group mb-3">
            <p>User Name : {this.state.getResponseData.username}</p>
          </div>

          <div className="input-group mb-3">
            <p>Skills : {skillSetValues}</p>
          </div>
        </div>
    );
  }
}

export default DisplayProfileContainer;
