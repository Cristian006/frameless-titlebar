import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../theme';
import styles from '../style.css';

const Bar = ({
  isWin,
  onDoubleClick,
  children,
  bottomBar
}) => {
  const theme = useContext(ThemeContext);
  const height = isWin ? theme.winBarHeight : theme.barHeight;
  const isStacked = theme.menuStyle === 'stacked';
  const showBorder =
    ((isStacked && bottomBar) || !isStacked) && theme.barShowBorder;

  return (
    <div
      className={styles.Bar}
      style={{
        padding: !isWin ? '0 70px' : 0,
        borderBottom: showBorder ? theme.barBorderBottom : '',
        backgroundColor: theme.barBackgroundColor,
        color: theme.barColor,
        height: height
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
