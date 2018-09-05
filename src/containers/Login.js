import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions/user';
import AlertMsg from '../components/AlertMsg';
import { Link } from 'react-router-dom';
import { CircularProgress, Icon } from '@material-ui/core/es/index';
import FrontHeader from '../components/FrontHeader';

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
  }

  /*************** User Login *************/
  handleLogin = event => {
    event.preventDefault();
    if (this.refs.username.value === '' || this.refs.password.value === '') {
      this.setState({ validationErr: 'Email and password is required!' });
    } else {
      let context = this,
        params = {
          email: this.refs.username.value,
          password: this.refs.password.value
        };
      this.setState({ loggingIn: true });
      this.props.login(params, res => {
        if (res.status) {
          this.refs.username.value = this.refs.password.value = '';
          context.props.history.replace('/dashboard');
        } else {
          context.setState({
            open: true,
            msg: res.message,
            msgType: res.type,
            msgStatus: res.status,
            loggingIn: false,
            validationErr: null
          });
        }
      });
    }
  };

  changePasswordVisibility = () => {
    this.setState({
      password_visibility: !this.state.password_visibility
    });
    this.refs.password.setAttribute('type', !this.state.password_visibility ? 'text' : 'password');
  };

  render() {
    let context = this;
    const { user } = this.props,
      { loggingIn, validationErr } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <AlertMsg
            onPress={() => context.setState({ open: false })}
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
                {!user.loggedIn &&
                  validationErr && (
                    <div className="error-msg ">
                      <i className="material-icons">clear</i>{' '}
                      <span> {this.state.validationErr}. </span>
                    </div>
                  )}

                <label className="center">Welcome to React</label>

                <form onSubmit={this.handleLogin} className="mt-5 mb-4">
                  <div className="col-sm-12 form-group">
                    <input
                      ref="username"
                      type="email"
                      placeholder="Your work email"
                      className="form-control"
                    />
                  </div>

                  <div className="col-sm-12 form-group">
                    <div className="input-group">
                      <input
                        type="password"
                        ref="password"
                        className="form-control"
                        placeholder="Password"
                      />

                      <div className="input-group-append">
                        <span onClick={this.changePasswordVisibility} className="input-group-text">
                          <Icon>
                            {' '}
                            {!this.state.password_visibility ? 'visibility_off' : 'visibility'}
                          </Icon>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 form-group">
                    <button disabled={loggingIn} type="submit" className="btn primary-btn">
                      {loggingIn ? <CircularProgress size={15} color={'white'} /> : 'Sign in'}
                    </button>
                  </div>

                  <div className="col-sm-12 p-4">
                    <span className="float-left form-link-text">
                      <label className="checkbox-wrap">
                        Remember me
                        <input type="checkbox" />
                        <span className="checkmark"> </span>
                      </label>
                    </span>

                    <span className="float-right form-link-text">
                      <a href="">Forgot Password?</a>
                    </span>
                  </div>

                  <div className="col-sm-10 bottom-bar text-center">
                    <span className="form-link-text">
                      <a href="">Don't have an account? </a>
                    </span>

                    <span>
                      <Link to="#">Sign up</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
