import React, { Component } from "react";
// import {register} from "../actions/auth";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ForgotPassword extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-7 p-0">
            <div className="inner-wrapper">
              <div className="col-sm-12">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    {/*<img src="images/logo.png">*/} Logo
                  </li>

                  <li className="list-inline-item">Nav Item 1</li>

                  <li className="list-inline-item">Nav Item 2</li>

                  <li className="list-inline-item">Nav Item 3</li>
                </ul>
              </div>

              <div className="center-img">Image TBD</div>
            </div>
          </div>

          <div className="col-sm-5">
            <div className="login-wrapper reset-module">
              <div className="col-sm-12 text-right">
                <Link to="/login" className="btn signin-btn">
                  Sign in
                </Link>
              </div>

              <div className="col-sm-12 center-form">
                <div className="error-msg ">
                  <i className="material-icons">clear</i>
                  <span>
                    An account doesn't exist with that email.Try again or Sign
                    up below.
                  </span>
                </div>

                <div className="success-msg ">
                  <i className="material-icons">done</i>
                  <span>Sent. Check your email for instructions.</span>
                  <p>
                    If you need additional assistance email
                    hello@experiencebeacon.io
                  </p>
                </div>

                <label>Reset Password</label>

                <p className="mt-3">
                  {" "}
                  Enter your email below and we'll send you an emailwith
                  instructions to reset your password.
                </p>

                <div className="col-sm-12 form-group">
                  <input
                    type="password"
                    ref="password"
                    className="form-control"
                    placeholder="Your work email"
                  />
                </div>

                <div className="col-sm-12 form-group">
                  <button type="submit" className="btn primary-btn">
                    Reset my password
                  </button>
                </div>

                <div className="col-sm-12 bottom-bar">
                  <span className="form-link-text">
                    <a href="">Don't have an account? </a>
                  </span>

                  <span>
                    <Link to="/register">Sign up</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  if (auth) {
    return { user: auth.user, loginError: auth.loginError };
  }
  return { user: null };
}

export default connect(mapStateToProps)(ForgotPassword);
