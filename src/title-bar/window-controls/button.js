import React from 'react';
import { useHover } from '../effects';
import styles from '../style.css';

const WindowButton = ({ children, onClick, close, controls, platform }) => {
  const [ref, hovering] = useHover();
  const config = close ? controls.close : controls.default;
  const color = hovering ? config.hoverColor : config.color;
  const background = hovering ? config.hoverBackground : 'transparent';

  const width = platform === 'win32' ? '100%' : '20px';
  const height = platform === 'win32' ? '100%' : '20px';

  return (
    <div
      ref={ref}
      className={styles.Control}
    >
      <div
        style={{
          width,
          height,
          color,
          background,
          borderRadius: controls.borderRadius,
          border: controls.border
        }}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  )
};

export default WindowButton;
