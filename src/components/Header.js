import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import menu from '../assets/images/hamburgr.png';

export default () => {
  return (
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
            <span className="proicon">Admin</span>

            <i className="fa fa-angle-down"> </i>
          </li>

          <li>
            <button className="btn btn-danger"> Logout </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
