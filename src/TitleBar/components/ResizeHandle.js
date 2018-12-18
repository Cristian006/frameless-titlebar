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
    height: '28px'
  },
  ResizeTop: {
    width: '100%',
    height: '3px'
  }
};

class ResizeHandle extends React.Component {
  render() {
    return (
      <div
        style={{ ...styles.ResizeHandle, ...(this.props.left ? styles.ResizeLeft : styles.ResizeTop) }}
      />
    );
  }
}

ResizeHandle.defaultProps = {
  left: PropTypes.bool,
  top: PropTypes.bool
};

export default ResizeHandle;
