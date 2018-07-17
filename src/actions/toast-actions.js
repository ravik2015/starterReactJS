/*
 * @file: toast-actions.js
 * @description: It Contain toasts Action function.
 * @date: 06.07.2018
 * @author: Jasdeep Singh
 */

import { push } from 'react-router-redux';
import { toast } from 'react-toastify';

export const toastAction = (status, message) => {
  if (status) {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  }
};

export const toastErrorAction = (dispatch, message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    onClose: () => {
      dispatch(push('/'));
    }
  });
  dispatch({ type: 'LOG_OUT' });
};
