import React, { useContext, useCallback } from 'react';
import styles from '../style.css';
import { ThemeContext } from '../theme';

interface OverlayProps {
  top: number | string;
  onClick?: (e: React.MouseEvent) => void;
}

const Overlay = ({ top, onClick }: OverlayProps) => {
  const theme = useContext(ThemeContext);
  const click = useCallback((e) => {
    onClick && onClick(e);
  }, [onClick])
  return (
    <div
      className={styles.MenuOverlay}
      style={{
        background: theme.menu.overlay!.background,
        opacity: theme.menu.overlay!.opacity,
        top: top,
        zIndex: theme.menu.overlay!.zIndex!
      }}
      onClick={click}
    />
  )
}

export default Overlay;
