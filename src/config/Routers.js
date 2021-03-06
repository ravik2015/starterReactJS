/*
 * @file: index.js
 * @description: It Contain Routes for application.
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 */

import React from 'react';
import { Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import { Auth } from '../auth';
import NotFound from '../components/NotFound';
import { frontLayout, dashboardLayout } from '../components/Layouts';
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';

const Routers = store => {
  return (
    <div>
      <Switch>
        <AppRoute
          exact={true}
          path="/"
          component={Login}
          requireAuth={Auth}
          layout={frontLayout}
          store={store}
          type="public"
        />

        <AppRoute
          exact
          path="/dashboard"
          component={Dashboard}
          requireAuth={Auth}
          layout={dashboardLayout}
          store={store}
        />

        <AppRoute
          exact
          path="*"
          component={NotFound}
          requireAuth={Auth}
          layout={frontLayout}
          store={store}
          type="public"
        />
      </Switch>
    </div>
  );
};

export default Routers;
