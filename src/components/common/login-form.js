import React from 'react';
import PropTypes from 'prop-types';
import { Control, LocalForm } from 'react-redux-form';
import { CircularProgress, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { required, validateEmail } from '../../utilities/Regex';

const LoginForm = ({
  password_visibility,
  loggingIn,
  _handleSubmit,
  _handleSubmitFailed,
  _handlePasswordVisibility
}) => {
  return (
    <LocalForm
      model="user"
      className="login-form"
      onSubmit={_handleSubmit}
      onSubmitFailed={_handleSubmitFailed}
    >
      <div className="col-sm-12 form-group">
        <Control.text
          model=".email"
          className="form-control"
          placeholder="Enter email address"
          validators={{
            required,
            validateEmail
          }}
        />
      </div>
      <div className="col-sm-12 form-group">
        <div className="input-group">
          <Control.text
            model=".password"
            type={password_visibility ? 'text' : 'password'}
            className="form-control"
            placeholder="Enter Password"
            validators={{
              required
            }}
          />
          <div className="input-group-append">
            <span onClick={_handlePasswordVisibility} className="input-group-text">
              <Icon> {!password_visibility ? 'visibility_off' : 'visibility'}</Icon>
            </span>
          </div>
        </div>
      </div>
      <div className="col-sm-12 form-group">
        <button disabled={loggingIn} type="submit" className="btn btn-primary">
          {loggingIn ? <CircularProgress size={15} color={'inherit'} /> : 'Sign in'}
        </button>
      </div>
      <div className="col-sm-12 p-4">
        <span className="float-left form-link-text">
          <label className="checkbox-wrap">
            <input type="checkbox" />
            Remember me
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
      <Control.reset id="reset" model="user" className="btn btn-cancel" style={{ display: 'none' }}>
        Cancel
      </Control.reset>
    </LocalForm>
  );
};

LoginForm.propTypes = {
  password_visibility: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  _handleSubmit: PropTypes.func.isRequired,
  _handleSubmitFailed: PropTypes.func.isRequired,
  _handlePasswordVisibility: PropTypes.func.isRequired
};

export default LoginForm;
