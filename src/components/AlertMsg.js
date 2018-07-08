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

import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const AlertMsg = props => {
 
    return (
      <div>
        {props.isShowingModal && (
          <SweetAlert
            showCancel={props.status == "warning" ? true : false}
            type={
              props.status == false
                ? "error"
                : props.status == "warning" ? "warning" : "success"
            }
            title={props.type}
            allowEscape
            confirmBtnText={props.status == "warning" ? "Yes" : "Close"}
            confirmBtnBsStyle={
              props.status == false || props.status == "warning"
                ? "danger"
                : "success"
            }
            onConfirm={
              props.status == "warning"
                ? () => props.actionConfirmed()
                : () => props.onPress()
            }
            cancelBtnBsStyle="default"
            onCancel={() => props.onPress()}
          >
            {props.msg}
          </SweetAlert>
        )}
      </div>
    );
  };

export default AlertMsg;
