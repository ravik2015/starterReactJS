/*
 * @file: index.js
 * @description: It Contain User Account Related Action Creators.
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 */

import RestClient from "../../utilities/RestClient";
import message from "../../utilities/messages";
import * as TYPE from "../../constants/action-types";

//Action Creator For Reducers

export const login_Success = data => ({ type: TYPE.LOGIN_SUCCESS, data: data });
export const log_out = () => ({ type: TYPE.LOG_OUT });
export const reset_password = data => ({ type: TYPE.RESET_PASSWORD });

// Thunk Action Creators For Api

/****** action creator for login ********/
export const login = (params, cb) => {
  return dispatch => {
    RestClient.post("user/login", params)
      .then(result => {
        console.log("result", result);
        if (result.success) {
          dispatch(login_Success(result.data));
          let res = {
            status: true,
            message: result.message,
            type: message.success
          };
          cb(res);
        } else {
          let res = {
            status: false,
            message: result.message,
            type: message.error
          };

          cb(res);
        }
      })
      .catch(error => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error
        };

        cb(res);
      });
  };
};

/****** action creator for register ********/
export const register = (params, cb) => {
  return dispatch => {
    RestClient.post("user/register", params)
      .then(result => {
        if (result.statusCode === 200) {
          result.response.token = result.token;
          dispatch(login_Success(result.response));
          let res = {
            status: true,
            message: result.status,
            type: message.success
          };
          cb(res);
        } else {
          let res = {
            status: false,
            message: result.message,
            type: message.error
          };

          cb(res);
        }
      })
      .catch(error => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error
        };

        cb(res);
      });
  };
};

/********** action creator to reset Password  **********/
export const resetPassword = (params, type, cb) => {
  let token = params.token;
  delete params.token;
  return dispatch => {
    RestClient.put(`user/password/${type}`, params, token)
      .then(result => {
        if (result.statusCode === 200) {
          dispatch(reset_password(result.response));

          let res = {
            status: true,
            message: result.message,
            type: message.success
          };
          cb(res);
        } else {
          let res = {
            status: false,
            message: result.message,
            type: message.error
          };
          cb(res);
        }
      })
      .catch(error => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error
        };
        cb(res);
      });
  };
};

/******** action creator to log user out of the application **********/
export const logOut = (params, cb) => {
  return dispatch => {
    dispatch(log_out());
    let res = {
      status: true,
      message: message.logout,
      type: message.logout
    };
    cb(res);
    // RestClient.delete("user/logout", "", params.token)
    //     .then(result => { console.log("result", result)
    //         if (result) {
    //             dispatch(log_out());
    //             let res = {
    //                 status: true,
    //                 message: message.logout,
    //                 type: message.logout
    //             };
    //             cb(res);
    //         }
    //     })
    //     .catch(error => {
    //         let res = {
    //             status: false,
    //             message: message.commonError.
    //             type: message.error
    //         };
    //         cb(res);
    //     });
  };
};
