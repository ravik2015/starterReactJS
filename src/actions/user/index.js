/*
 * @file: index.js
 * @description: It Contain User Account Related Action Creators.
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 */

import RestClient from "../../utilities/RestClient";
import message from "../../constants/messages";
import * as TYPE from "../../constants/action-types";

//Action Creator For Reducers

export const login_Success = data => ({ type: TYPE.LOGIN_SUCCESS, data: data });
export const log_out = () => ({ type: TYPE.LOG_OUT });

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
