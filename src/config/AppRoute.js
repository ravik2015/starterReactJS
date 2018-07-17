/*
 * @file: AppRoute.js
 * @description: Defined all routers
 * @date: 04.07.2018
 * @author: Jasdeep Singh
*/

/************ React Pages according to layouts  *****************/

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AppRoute = ({
  component: Component,
  layout: Layout,
  requireAuth,
  to = '/',
  store,
  type = 'private',
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const isLogin = requireAuth(store);
      if (isLogin && props.location.pathname === '/') {
        return (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: props.location }
            }}
          />
        );
      }
      if (type === 'public') {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }
      return isLogin || props.location.pathname === '/' ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: to,
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

export default AppRoute;
