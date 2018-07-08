/*
 * @file: user.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @date: 04.07.2018
 * @author: Jasdeep Singh
*/

import * as TYPE from "../../constants/action-types";

/******** Reducers ********/

const initialState = {
  loggedIn: false,
  remember: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.LOGIN_SUCCESS:
      return { ...state, ...{ loggedIn: true }, ...action.data };

    case TYPE.LOG_OUT:
      let _remember = state.remember;
      return { ...initialState, ...{ remember: _remember } };

    default:
      return state;
  }
}
