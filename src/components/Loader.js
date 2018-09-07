import React from 'react';
import PropTypes from 'prop-types';
import ReactLoader from 'react-loaders';

const Loader = ({ loading }) => {
  return (
    loading && (
      <div
        style={{
          height: '50vh',
          width: '50vw',
          position: 'absolute',
          zIndex: '10',
          top: 0,
          left: 0,
          paddingTop: '50vh',
          paddingLeft: '50vw',
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
      >
        <ReactLoader type="pacman" active />
      </div>
    )
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired
};

Loader.defaultProps = {
  loading: true
};

export default Loader;
