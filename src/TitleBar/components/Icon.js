import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  Icon: {
    height: '16px',
    width: '16px',
    margin: '0px 6px'
  }
};

class Icon extends React.Component {
  render() {
    let { src, onIconClick, notWin } = this.props;
    let marginLeft = notWin ? 'auto' : '6px';
    return (
      <img
        src={src}
        alt='app-icon'
        onClick={onIconClick}
        style={{...styles.Icon, marginLeft}}
      />
    );
  }
}

Icon.defaultProps = {
  src: PropTypes.string,
  onIconClick: PropTypes.func
};

export default Icon;
