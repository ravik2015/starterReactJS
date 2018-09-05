/* 
      *                                                            *
    *****                                                        *****                             
      *                                                            *
        ==========================================================
        ==========                                      ==========
        ==========          Page for alert messages     ==========
        ==========                                      ==========
        ==========================================================
      *                                                            *
    *****                                                        *****   
      *                                                            *
*/

import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';

const AlertMsg = ({ isShowingModal, status, type, msg, onPress, actionConfirmed }) => {
  return (
    <React.Fragment>
      {isShowingModal && (
        <SweetAlert
          showCancel={status === 'warning' ? true : false}
          type={status === false ? 'error' : status === 'warning' ? 'warning' : 'success'}
          title={type}
          allowEscape
          confirmBtnText={status === 'warning' ? 'Yes' : 'Close'}
          confirmBtnBsStyle={status === false || status === 'warning' ? 'danger' : 'success'}
          onConfirm={status === 'warning' ? () => actionConfirmed() : () => onPress()}
          cancelBtnBsStyle="default"
          onCancel={() => onPress()}
        >
          {msg}
        </SweetAlert>
      )}
    </React.Fragment>
  );
};

AlertMsg.propTypes = {
  isShowingModal: PropTypes.bool.isRequired,
  status: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  actionConfirmed: PropTypes.func.isRequired
};

AlertMsg.defaultProps = {
  status: false,
  type: '',
  msg: '',
  onPress: () => ({}),
  actionConfirmed: () => ({})
};

export default AlertMsg;
