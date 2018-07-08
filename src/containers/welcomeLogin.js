import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/auth";

import { Link } from "react-router-dom";

// material components
import { CircularProgress, Icon } from "@material-ui/core/es/index";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      password_visibility: false
    };
  }

  componentDidMount() {
    this.handleLogout();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      // logged in, let's show redirect if any, or show home
      try {
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        nextProps.history.replace(from);
      } catch (err) {
        nextProps.history.replace("/");
      }
    }
  }

  render() {
    const { user, loginError, loggingIn } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-7 p-0">
            <div className="inner-wrapper">
              <div className="col-sm-12">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    {/*<img src="images/logo.png"> */}
                    Logo
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
            <div className="login-wrapper animated fadeIn">
              <div className="col-sm-12 center-form">
                {!user &&
                  loginError && (
                    <div className="error-msg ">
                      <i className="material-icons">clear</i>{" "}
                      <span> Please provide valid input. </span>
                    </div>
                  )}

                <label>Tell us about yourself</label>

                <form onSubmit={this.handleLogin} className="mt-5 mb-4">
                  <div className="col-sm-12 form-group">
                    <p className="text-left"> What will you use Beacon for? </p>

                    <select className="form-control">
                      <option>User Research</option>
                      <option>Academic Research</option>
                      <option>Customer Discovery</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-sm-12 form-group">
                    <p className="text-left">
                      {" "}
                      What's the name of your organisation?
                    </p>

                    <input
                      type="text"
                      name=""
                      class="form-control"
                      placeholder="Organisation Name"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <p className="text-left"> What's your role?</p>

                    <input
                      type="text"
                      name=""
                      placeholder="Job title"
                      class="form-control"
                    />
                  </div>
                  <div className="col-sm-12 form-group">
                    <p className="text-left"> How big is your team? </p>

                    <select className="form-control">
                      <option>1-3 people</option>
                      <option>4-10 people</option>
                      <option>10+ people</option>
                    </select>
                  </div>

                  <div className="col-sm-12 form-group welcome-bottom-bar">
                    <div className="skip">skip</div>{" "}
                    <button className="btn primary-btn">
                      Update my profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleLogin = event => {
    event.preventDefault();
    this.props.dispatch(
      login(this.refs.username.value, this.refs.password.value)
    );
    this.refs.username.value = this.refs.password.value = ``;
  };

  changePasswordVisibility = () => {
    this.setState({
      password_visibility: !this.state.password_visibility
    });
    this.refs.password.setAttribute(
      "type",
      !this.state.password_visibility ? `text` : `password`
    );
  };

  handleLogout = event => localStorage.removeItem("id_token");
}

Login.contextTypes = {
  store: PropTypes.object.isRequired
};

Login.propTypes = {
  user: PropTypes.string,
  loginError: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth } = state;
  if (auth) {
    return auth;
  }
  return { user: null };
}

export default connect(mapStateToProps)(Login);
