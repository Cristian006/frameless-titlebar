import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../theme';
import styles from '../style.css';

const Bar = ({
  onDoubleClick,
  children,
  bottomBar
}) => {
  const {
    platform,
    bar: {
      height,
      borderBottom,
      background,
      color
    },
    menu: {
      style
    }
  } = useContext(ThemeContext);
  const isDarwin = platform === 'darwin';
  return (
    <div
      className={styles.Bar}
      style={{
        padding: isDarwin ? '0 70px' : 0,
        borderBottom: (style === 'stacked' && !bottomBar) ? '' : borderBottom,
        background,
        color,
        height
      }}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
};

Bar.propTypes = {
  isWin: PropTypes.bool,
  onDoubleClick: PropTypes.func,
  children: PropTypes.node,
  bottomBar: PropTypes.bool
};

export default Bar;
