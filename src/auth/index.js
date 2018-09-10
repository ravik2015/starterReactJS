/*
 * @file: App.js
 * @description: Auth functions here
 * @date: 10.09.2018
 * @author: Jasdeep Singh
 * */

/******** Get User from store  ***********/
export const User = store => {
  return store.getState().user;
};

/******** Routing authentication middleware ***********/
export const Auth = store => {
  return User(store).loggedIn;
};
