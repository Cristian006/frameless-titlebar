import React, { useContext, useRef, useCallback } from 'react';
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
  const ref = useRef(null);
  const dblClick = useCallback((e) => {
    if (e.target == ref.current) {
      onDoubleClick && onDoubleClick(e);
    }
  }, [ref.current, onDoubleClick])
  const isDarwin = platform === 'darwin';
  return (
    <div
      className={styles.Bar}
      ref={ref}
      style={{
        padding: isDarwin ? '0 70px' : 0,
        borderBottom: (style === 'stacked' && !bottomBar) ? '' : borderBottom,
        background,
        color,
        height,
        fontFamily,
      }}
      onDoubleClick={dblClick}
    >
      {children}
    </div>
  );
};

export default Bar;
