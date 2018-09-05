/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @date: 04.07.2018
 * @author: Jasdeep Singh
*/

import React from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/*************** Front Layout ***************/
export const frontLayout = props => {
  window.scrollTo(0, 0);
  return (
    <section className="main-content frontend" id="home">
      <section className="content">{props.children}</section>
    </section>
  );
};

/*************** Dashboard Layout ***************/
export const dashboardLayout = props => {
  window.scrollTo(0, 0);
  return (
    <React.Fragment>
      <Header />
      <ToastContainer />
      <div className="appContent">
        <div className="main-container collapse-sidebar">
          <Sidebar />
          {props.children}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
