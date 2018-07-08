/*********** Routes for applications **************/
import React from "react";
import { Switch } from "react-router-dom";
import AppRoute from "./AppRoute";
import { auth } from "../utilities/auth";
import Register from "../containers/Register";
import NotFound from "../components/NotFound";
import { frontLayout, dashboardLayout } from "../components/Layouts";
import ForgotPassword from "../containers/ForgotPassword";
import Login from "../containers/Login";
import RegisterPayment from "../containers/RegisterPayment";
import Home from "../containers/Home";
import RecordStep1 from "../containers/records/RecordStep1";
import RecordStep2 from "../containers/records/RecordStep2";
import RecordStep3 from "../containers/records/RecordStep3";
import RecordStep4 from "../containers/records/RecordStep4";
import Docs from "../containers/docs/Docs";
import DocsList from "../containers/docs/DocsList";

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
          component={Home}
          requireAuth={auth}
          layout={dashboardLayout}
          store={store}
        />

        <AppRoute
          exact
          path="/register"
          component={Register}
          requireAuth={() => false}
          layout={frontLayout}
          store={store}
          type="public"
        />
        <AppRoute
          exact
          path="/register_payment"
          component={RegisterPayment}
          requireAuth={() => false}
          layout={frontLayout}
          store={store}
          type="public"
        />
        <AppRoute
          exact
          path="/forgot_password"
          component={ForgotPassword}
          requireAuth={() => false}
          layout={frontLayout}
          store={store}
          type="public"
        />

        <AppRoute
          exact
          path="/records/step_one"
          component={RecordStep1}
          requireAuth={auth}
          layout={dashboardLayout}
          store={store}
        />

        <AppRoute
          exact
          path="/records/step_two"
          component={RecordStep2}
          requireAuth={auth}
          layout={dashboardLayout}
          store={store}
        />

        <AppRoute
          exact
          path="/records/step_three"
          component={RecordStep3}
          requireAuth={auth}
          layout={dashboardLayout}
          store={store}
        />

        <AppRoute
          exact
          path="/records/step_four"
          component={RecordStep4}
          requireAuth={auth}
          layout={dashboardLayout}
          store={store}
        />

        <AppRoute
          exact
          path="/docs/:_id"
          component={Docs}
          requireAuth={auth}
          layout={dashboardLayout}
          store={store}
        />

        <AppRoute
          exact
          path="/docs"
          component={DocsList}
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
