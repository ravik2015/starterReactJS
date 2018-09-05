/* 
      *                                                            *
    *****                                                        *****                             
      *                                                            *
        ==========================================================
        ==========                                      ==========
        ==========     Page for service hit loader      ==========
        ==========                                      ==========
        ==========================================================
      *                                                            *
    *****                                                        *****   
      *                                                            *
*/

import React from 'react';
import PropTypes from 'prop-types';
import { ScaleLoader } from 'halogenium';

const ProcessingLoader = ({ isShowingLoader }) => {
  return (
    <div
      style={{
        display: 'block',
        fontSize: '0',
        position: 'fixed',
        zIndex: '9999',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {isShowingLoader && <ScaleLoader color="#3d8dbc" size="26px" margin="4px" />}
    </div>
  );
};

ProcessingLoader.propTypes = {
  isShowingLoader: PropTypes.bool.isRequired
};

export default ProcessingLoader;
