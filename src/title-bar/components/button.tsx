import React, { useRef, useEffect } from 'react';
import { useRect, useHover, useClickAway } from '../effects';
import Overlay from './overlay';
import { MenuButtonTheme } from '../typings';
import styles from '../style.css';

const getBackgroundColor = (disabled: boolean, selected: boolean, hovering: boolean, theme: Required<MenuButtonTheme>): string => {
  if (!disabled) {
    if (selected) {
      return theme.active!.background!;
    }

    if (hovering) {
      return theme.hover!.background!;
    }
  }

  return theme.default!.background!;
};

const getColor = (disabled: boolean, open: boolean, theme: Required<MenuButtonTheme>): string => {
  if (open && !disabled) {
    return theme.active!.color!;
  }
  return theme.default!.color!;
};

const getOpacity = (disabled: boolean, focused: boolean, inActiveOpacity: number, theme: Required<MenuButtonTheme>): number => {
  if (!focused) {
    return inActiveOpacity!;
  }

  if (disabled) {
    return theme.disabledOpacity!;
  }

  return 1;
};

interface ButtonProps {
  label: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  focused: boolean;
  myRef?: React.RefObject<HTMLDivElement>;
  onOverlayClick: () => void;
  onClick: (e: React.MouseEvent) => void;
  onHover?: (hovering: boolean) => void;
  theme: Required<MenuButtonTheme>;
  inactiveOpacity: number;
  style?: React.CSSProperties;
  disabled: boolean;
  hideOverlay?: boolean;
}

const Button = ({
  myRef,
  onOverlayClick,
  theme,
  label,
  children,
  open,
  inactiveOpacity,
  focused,
  onClick,
  style,
  disabled,
  hideOverlay,
  onHover
}: ButtonProps) => {
  myRef = myRef ?? useRef(null);
  const bounds = useRect(myRef);
  const [hoverRef, hovering] = useHover<HTMLButtonElement>();

  useClickAway(hoverRef, () => {
    if (open) {
      onOverlayClick();
    }
  });

  useEffect(() => {
    onHover && onHover(hovering);
  }, [hovering]);


  const backgroundColor = getBackgroundColor(disabled, open, hovering, theme);
  const color = getColor(disabled, open, theme);
  const opacity = getOpacity(disabled, focused, inactiveOpacity, theme);

  return (
    <div
      className={styles.MenuButtonContainer}
      ref={myRef}
      style={{
        ...(style ?? {}),
        backgroundColor
      }}
      tabIndex={0}
      aria-haspopup
    >
      {
        open && !hideOverlay && (
          <Overlay
            top={bounds.bottom}
          />
        )
      }
      {
        open && children
      }
      <div className={styles.MenuButtonWrapper}>
        <button
          className={styles.MenuButton}
          ref={hoverRef}
          style={{
            color,
            maxWidth: theme.maxWidth
          }}
          onClick={onClick}
        >
          <div className={styles.MenuButtonLabelWrapper} style={{ opacity, maxWidth: theme.maxWidth }}>
            {label}
          </div>
        </button>
      </div>
    </div>
  )
}

export default React.forwardRef<HTMLDivElement, ButtonProps>((props, ref) => {
  return <Button {...props} myRef={ref as React.RefObject<HTMLDivElement>} />
});
