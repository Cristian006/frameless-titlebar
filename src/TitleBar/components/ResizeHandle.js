import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  ResizeHandle: {
    position: 'absolute',
    top: 0,
    left: 0,
    WebkitAppRegion: 'no-drag'
  },
  ResizeLeft: {
    width: '3px',
  },
  ResizeTop: {
    width: '100%',
    height: '3px'
  }
};

class ResizeHandle extends React.Component {
  render() {
    const { height, left } = this.props;
    return (
      <div
        style={{ ...styles.ResizeHandle, ...(left ? styles.ResizeLeft : styles.ResizeTop), height }}
      />
    );
  }
}

ResizeHandle.defaultProps = {
  left: PropTypes.bool,
  top: PropTypes.bool
};

export default ResizeHandle;
