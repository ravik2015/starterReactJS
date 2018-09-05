import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="sidebar">
      <ul className="sidenav">
        <li className="dashboard active">
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li className="files">
          <Link to="/docs">My Files</Link>
        </li>

        <li className="help">
          <a href="">Help</a>
        </li>

        <li className="archive">
          <a href="">Archives</a>
        </li>
      </ul>
    </div>
  );
};
