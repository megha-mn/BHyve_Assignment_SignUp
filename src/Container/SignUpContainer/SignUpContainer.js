import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUpContainer.css";
import TextInputField from "../../Components/TextInputField";
import { Formik } from "formik";
import TabPanel from "../../Components/TabPanel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";
import { BASE_API_URL } from "../../configUrl";
import ProfileDetailsContainer from "../ProfileDetailsContainer";

class SignUpContainer extends Component {
  state = {
    // email: null,
    value: 0,
    unAuthorizedError: false,
    unAuthorizedErrorMsg: null,
    existingUserNameError: false,
    existingUserNameErrorMsg: null,
    authorizedUser: false,
    accessToken: null,
  };

  handleTabChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    return (
      <div>
        {!this.state.authorizedUser && (
          <div>
            <div className="tabBarStyle">
              <Tabs value={this.state.value} onChange={this.handleTabChange}>
                <Tab label="Sign In" className="tabTitleStyle" />
                <Tab label="Sign Up" className="tabTitleStyle" />
              </Tabs>
            </div>
            {/* Login Tab */}
            <TabPanel value={this.state.value} index={0}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "This field is Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Please enter a valid email address";
                  }
                  if (!values.password) {
                    errors.password = "This field is Required";
                  } else if (
                    // !/^(?=.*[A-Za-z])(?=.*\d)(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/i.test(
                    // !/^(?=.*[A-Za-z])(?=.*[\d$@.!%*#?&])[A-Za-z\d$@.!%*#?&]{8,20}$/i.test( //either num or special character or both
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/i.test(
                      values.password
                    )
                  ) {
                    errors.password = "Please enter a valid password";
                  }
                  return errors;
                }}
                // Login Handler/ Sign In
                onSubmit={(values, { setSubmitting }) => {
                  axios
                    .post(
                      `${BASE_API_URL}/user/signin`,
                      {
                        username: values.email,
                        password: values.password,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    )
                    .then(
                      (response) => {
                        this.setState({
                          authorizedUser: true,
                          accessToken: response.data.accessToken,
                        });
                        sessionStorage.setItem("token", this.state.accessToken);
                      },
                      (error) => {
                        if (error.response.data.statusCode === 401) {
                          this.setState({
                            unAuthorizedError: true,
                            unAuthorizedErrorMsg: error.response.data.message,
                          });
                        }
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
                    <div className="container">
                      <div className="form-box">
                        <h5 className="signInHeadingStyle">
                          Already have an account ?
                        </h5>
                        <p className="signInSubHeadingStyle">
                          Please enter the crediantials
                        </p>
                        <div className="input-group mb-3">
                          <TextInputField
                            type="email"
                            name="email"
                            placeHolder="Enter your Email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            fullWidth={true}
                          />
                          <p className="errorMsg">
                            {errors.email || (touched.email && errors.email)}
                          </p>
                        </div>
                        <div className="input-group mb-3">
                          <TextInputField
                            type="password"
                            name="password"
                            placeHolder="Enter password"
                            label="Password"
                            value={values.password}
                            onChange={handleChange}
                            fullWidth={true}
                          />
                          <p className="errorMsg">
                            {errors.password ||
                              (touched.password && errors.password)}
                          </p>
                        </div>
                        {this.state.unAuthorizedError && (
                          <p className="errorMsg">
                            {this.state.unAuthorizedErrorMsg}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-block btnStyle"
                        >
                          LOGIN
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </TabPanel>

            {/* Register */}
            <TabPanel value={this.state.value} index={1}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "This field is Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Please enter a valid email address";
                  }
                  if (!values.password) {
                    errors.password = "This field is Required";
                  } else if (
                    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/i.test(
                      values.password
                    )
                  ) {
                    errors.password = "Please enter a valid password";
                  }
                  return errors;
                }}
                // Register Handler
                onSubmit={(values, { setSubmitting }) => {
                  // setTimeout(() => {
                  //   // alert(JSON.stringify(values, null, 2));
                  //   setSubmitting(false);
                  // }, 400);

                  // axios.post("https://be.bhyve-app.com:3020/user/signup",{
                  axios
                    .post(
                      `${BASE_API_URL}/user/signup`,
                      {
                        username: values.email,
                        password: values.password,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    )
                    .then(
                      (response) => {
                      },
                      (error) => {
                        if (error.response.data.statusCode === 409) {
                          this.setState({
                            existingUserNameError: true,
                            existingUserNameErrorMsg:
                            error.response.data.message,
                            // value: 0,
                          });
                        }
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
                    <div className="container">
                      <div className="form-box">
                        <h5 className="signInHeadingStyle">New to BHyve ?</h5>
                        <p className="signInSubHeadingStyle">
                          Please create an account to sign in
                        </p>
                        <div className="input-group mb-3">
                          <TextInputField
                            type="email"
                            name="email"
                            placeHolder="Create your Email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            fullWidth={true}
                          />
                          <p className="errorMsg">
                            {errors.email || (touched.email && errors.email)}
                          </p>
                        </div>
                        <div className="input-group mb-3">
                          <TextInputField
                            type="password"
                            name="password"
                            placeHolder="Enter password"
                            label="Password"
                            value={values.password}
                            onChange={handleChange}
                            fullWidth={true}
                          />
                          <p className="errorMsg">
                            {errors.password ||
                              (touched.password && errors.password)}
                          </p>
                        </div>

                        {this.state.existingUserNameError && (
                          <p className="errorMsg">
                            {this.state.existingUserNameErrorMsg}
                          </p>
                        )}

                        <button
                          name="register"
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-block btnStyle"
                        >
                          REGISTER
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </TabPanel>
          </div>
        )}
        {this.state.authorizedUser && <ProfileDetailsContainer />}
      </div>
    );
  }
}

export default SignUpContainer;
