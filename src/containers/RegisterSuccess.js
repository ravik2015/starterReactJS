import React, { Component } from "react";
import { register } from "../actions/user";

import successBanner from "../assets/images/successsign.jpg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class RegisterSuccess extends Component {
  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this);

    this.state = {
      registerError: null
    };
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    const { registerError } = this.state;

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
            <div className="login-wrapper">
              <div className="col-sm-12 text-right">
                <Link to="/" className="btn signin-btn">
                  Sign in
                </Link>
              </div>

              <div className="col-sm-12 center-form register-success">
                <img src={successBanner} className="mb-3" />
                <label className="link-form-text">You're all set!</label>

                <form className="mt-1">
                  <div className="headline">
                    <p> Sign in with the link in your email.</p>
                  </div>

                  <div className="col-sm-12 form-group">
                    <button className="btn primary-btn">
                      Resend the email{" "}
                    </button>
                  </div>

                  <div className="col-sm-12 form-group">
                    <p> Change my email from email@companyname.com </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  saveUser = event => {
    event.preventDefault();

    if (
      !this.refs.name.value ||
      !this.refs.email.value ||
      !this.refs.password.value
    ) {
      this.setState({
        registerError: false
      });
      return false;
    }

    this.props.dispatch(
      register({
        email: this.refs.email.value,
        name: this.refs.name.value,
        password: this.refs.password.value
      })
    );

    this.refs.name.value = this.refs.email.value = this.refs.password.value =
      "";
  };
}

RegisterSuccess.contextTypes = {
  store: PropTypes.object.isRequired
};

RegisterSuccess.propTypes = {
  user: PropTypes.string,
  registerError: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth } = state;

  if (auth) {
    return { user: { email: "", name: "" }, registerError: auth.registerError };
  }
  return { user: null };
}

export default connect(mapStateToProps)(RegisterSuccess);
