/*
 * @file: App.js
 * @description: Auth functions here
 * @date: 05.07.2018
 * @author: Jasdeep Singh
 * */

export const auth = store => {
  return store.getState().user.loggedIn;
};
