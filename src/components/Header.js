import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
//import injectTapEventPlugin from 'react-tap-event-plugin';
import { logOut } from "../actions/user";
import logo from "../assets/images/logo.png";
import menu from "../assets/images/hamburgr.png";

import "./_styles/header.css";

//injectTapEventPlugin();

class Header extends Component {
  onLogoutClick = () => {
    const { user, history, logOut } = this.props;
    logOut({ token: user.token }, res => {
      if (res) {
        history.push("/");
      }
    });
  };

  render() {
    const { user, history } = this.props;
    const pathname = history.location.pathname;
    const isLoginPage = pathname.indexOf("register") > -1;
    const isRegisterPage = pathname.indexOf("login") > -1;
    const isForgotPasswordPage = pathname.indexOf("forgot_password") > -1;

    return (
      !isLoginPage &&
      !isRegisterPage &&
      !isForgotPasswordPage && (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">        
          <div className="navbar-brand">
            <Link to="/" className="pull-left">
              <img src={logo} alt="logo" />
            </Link>

            <Link to="/" className="pull-right">
              <img src={menu} alt="logo" />
            </Link>
          </div>

          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div id="navbarCollapse" className="collapse navbar-collapse">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>

            <ul className="navbar-nav ml-auto mt-2 mt-md-0">
              <li>
                <span className="proicon">{user.name.charAt(0)}</span>

                <i className="fa fa-angle-down"> </i>
              </li>

              <li>
                <button
                  onClick={() => this.onLogoutClick()}
                  className="btn btn-danger"
                >
                  {" "}
                  Logout{" "}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logOut: bindActionCreators(logOut, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
