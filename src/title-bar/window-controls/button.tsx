import React from 'react';
import { useHover } from '../effects';
import styles from '../style.css';
import { WindowButtonProps, ColorMap } from '../typings';

const WindowButton = ({
  children,
  onClick,
  close,
  controls,
  platform,
  isDisabled
}: WindowButtonProps) => {
  const [ref, hovering] = useHover<HTMLDivElement>();
  let config: ColorMap;
  if (close) {
    config = hovering ? controls.close.hover! : controls.close.default!;
  } else {
    config = (hovering && !isDisabled) ? controls.normal.hover! : controls.normal.default!;
  }

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
          color: config.color,
          background: config.background,
          borderRadius: controls.borderRadius,
          border: controls.border,
          opacity: (isDisabled && !close) ? controls.normal.disabledOpacity : 1
        }}
        onClick={!isDisabled ? onClick : () => {}}
      >
        {children}
      </div>
    </div>
  )
};

export default WindowButton;
