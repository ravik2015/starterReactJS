import React, { Component } from "react";
import "./_styles/footer.css";
import { withRouter } from "react-router";

import chat from "../assets/images/message_float.png";
import PropTypes from "prop-types";

class Footer extends Component {
  render() {
    const pathname = this.props.history.location.pathname;
    const isLoginPage = pathname.indexOf("register") > -1;
    const isRegisterPage = pathname.indexOf("login") > -1;
    const isForgotPasswordPage = pathname.indexOf("forgot_password") > -1;

    return (
      !isLoginPage &&
      !isRegisterPage &&
      !isForgotPasswordPage && (
        <div className="chat-float">
          <a href="">
            {" "}
            <img src={chat} />
          </a>
        </div>
      )
    );
  }
}

Footer.propTypes = {
  user: PropTypes.string
  // handleLogout: PropTypes.func.isRequired
};

export default withRouter(Footer);
