import React, { useContext } from 'react';
import { ThemeContext } from '../theme';
import styles from '../style.css';
import { BarProps } from '../typings';

const Bar = ({
  onDoubleClick,
  children,
  bottomBar
}: BarProps) => {
  const {
    platform,
    bar: {
      height,
      borderBottom,
      background,
      fontFamily,
      color,
    },
    menu: {
      style,
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
        height,
        fontFamily,
      }}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
};

export default Bar;
