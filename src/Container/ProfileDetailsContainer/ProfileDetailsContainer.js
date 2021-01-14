import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfileDetailsContainer.css";
import TextInputField from "../../Components/TextInputField";
import { Formik } from "formik";
import axios from "axios";
import { BASE_API_URL } from "../../configUrl";
import UserSkillSelectionContainer from '../UserSkillSelectionContainer';

class ProfileDetailsContainer extends Component {
  state = {
    accessToken :  sessionStorage.getItem('token'),
    displayAllSkills : false
  };

  handleTabChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    return (
      <div className="profileContainer">
        <div className="profile-form-box">
          {!this.state.displayAllSkills &&
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.first_name) {
                errors.first_name = "This field is Required";
              } else if (!/^([a-zA-Z\-]+){3,}$/i.test(values.first_name)) {
                errors.first_name = "Please enter a valid First Name";
              }
              if (!values.last_name) {
                errors.last_name = "This field is Required";
              } else if (!/^([a-zA-Z\-]+){1,}$/i.test(values.last_name)) {
                errors.last_name = "Please enter a valid password";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   setSubmitting(false);
              // }, 400);
              axios
                .post(
                  `${BASE_API_URL}/user/basic/profile`,
                  {
                    "firstName": values.first_name,
                    "lastName":  values.last_name
                },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${this.state.accessToken}` 
                    },
                  }
                )
                .then(
                  (response) => {
                    this.setState({displayAllSkills : true})
                  },
                  (error) => {
                    console.log("error",error)
                  }
                );
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <h5 className="signInHeadingStyle">Please fill you Profile details</h5>
                <div className="input-group mb-3">
                  <TextInputField
                    type="text"
                    name="first_name"
                    placeHolder="Enter your First Name"
                    label="First Name"
                    value={values.first_name}
                    onChange={handleChange}
                    fullWidth={true}
                  />
                  <p className="errorMsg">
                    {errors.first_name ||
                      (touched.first_name && errors.first_name)}
                  </p>
                </div>
                <div className="input-group mb-3">
                  <TextInputField
                    type="text"
                    name="last_name"
                    placeHolder="Enter your Last Name"
                    label="Last Name"
                    value={values.last_name}
                    onChange={handleChange}
                    fullWidth={true}
                  />
                  <p className="errorMsg">
                    {errors.last_name ||
                      (touched.last_name && errors.last_name)}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-block btnStyle"
                >
                  SUBMIT
                </button>
              </form>
            )}
          </Formik>
         }

          {this.state.displayAllSkills &&
            <UserSkillSelectionContainer />
          }
        </div>
      </div>
    );
  }
}

export default ProfileDetailsContainer;
