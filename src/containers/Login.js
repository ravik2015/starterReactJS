import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions/user';
import AlertMsg from '../components/AlertMsg';
import FrontHeader from '../components/FrontHeader';
import LoginForm from '../components/common/login-form';
import Message from '../constants/messages';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password_visibility: false,
      validationErr: null,
      open: false,
      loggingIn: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
    this.handlePasswordVisibility = this.handlePasswordVisibility.bind(this);
  }

  /******* form validation errors */
  setErrors(message) {
    this.setState({
      validationErr: message
    });
  }

  /*********  Handle on submit failed ***********/
  handleSubmitFailed = user => {
    if (user.email.errors.required) {
      this.setErrors(Message.requiredField('Email'));
    } else if (user.email.errors.validateEmail) {
      this.setErrors(Message.validEmail);
    } else if (user.password.errors.required) {
      this.setErrors(Message.requiredField('Password'));
    }
  };

  /*************** User Login *************/
  handleLogin = user => {
    this.setState({ loggingIn: true });
    this.props.login(user, res => {
      if (res.status) {
        document.getElementById('reset').click();
        this.props.history.replace('/dashboard');
      } else {
        this.setState({
          open: true,
          msg: res.message,
          msgType: res.type,
          msgStatus: res.status,
          loggingIn: false,
          validationErr: null
        });
      }
    });
  };
  /*************** Password Visibility toggle *************/
  handlePasswordVisibility = () => {
    this.setState({
      password_visibility: !this.state.password_visibility
    });
  };

  render() {
    const { loggingIn, validationErr, password_visibility } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <AlertMsg
            onPress={() => this.setState({ open: false })}
            isShowingModal={this.state.open}
            msg={this.state.msg}
            type={this.state.msgType}
            status={this.state.msgStatus}
          />
          <div className="col-sm-12">
            <div className="inner-wrapper">
              <FrontHeader />
            </div>
            <div className="login-wrapper animated fadeIn">
              <div className="col-sm-6 offset-3 center-form">
                {validationErr && (
                  <div className="error-msg">
                    <span> {this.state.validationErr}. </span>
                  </div>
                )}
                <label className="center">Login</label>
                <LoginForm
                  loggingIn={loggingIn}
                  password_visibility={password_visibility}
                  _handleSubmit={this.handleLogin}
                  _handleSubmitFailed={this.handleSubmitFailed}
                  _handlePasswordVisibility={this.handlePasswordVisibility}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch)
});

export default connect(null, mapDispatchToProps)(Login);
