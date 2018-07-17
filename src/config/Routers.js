/*********** Routes for applications **************/
import React from 'react';
import { Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import { auth } from '../utilities/auth';
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
          requireAuth={auth}
          layout={frontLayout}
          store={store}
          type="public"
        />

        <AppRoute
          exact
          path="/dashboard"
          component={Dashboard}
          requireAuth={auth}
          layout={dashboardLayout}
          store={store}
        />

        <AppRoute
          exact
          path="*"
          component={NotFound}
          requireAuth={() => false}
          layout={frontLayout}
          store={store}
          type="public"
        />
      </Switch>
    </div>
  );
};

export default Routers;
