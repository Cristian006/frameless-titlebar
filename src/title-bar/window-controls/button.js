import React from 'react';
import cx from 'classnames';
import { useHover } from '../effects';
import styles from '../style.css';

const WindowButton = ({ children, onClick, close, controls }) => {
  const [ref, hovering] = useHover();
  const config = close ? controls.close : controls.default;
  const color = hovering ? config.hoverColor : config.color;
  const background = hovering ? config.hoverBackground : 'transparent';
  return (
    <div
      ref={ref}
      className={cx(styles.ControlsButton, {
        [styles.Close]: close
      })}
      onClick={onClick}
      style={{
        color,
        background
      }}
    >
      {children}
    </div>
  )
};

export default WindowButton;
