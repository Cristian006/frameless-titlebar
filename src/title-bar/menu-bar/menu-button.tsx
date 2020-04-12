import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import { ThemeContext } from '../theme';
import { useRect, useHover } from '../effects';
import MenuList from './menu-list';
import { currentSelected, isItemSubMenu } from '../utils';
import styles from '../style.css';
import { MenuButtonProps, TitleBarTheme, MenuItem, FullMenuBottonProps } from '../typings';

const getBackgroundColor = (item: MenuItem, selected: boolean, hovering: boolean, theme: Required<TitleBarTheme>): string => {
  if (!item.disabled) {
    if (selected) {
      return theme.bar.button!.active!.background!;
    }

    if (hovering) {
      return theme.bar.button!.hover!.background!;
    }
  }

  return theme.bar.button!.default!.background!;
};

const getColor = (item: MenuItem, open: boolean, theme: Required<TitleBarTheme>): string => {
  if (open && !item.disabled) {
    return theme.bar.button!.active!.color!;
  }
  return theme.bar.button!.default!.color!;
};

const getOpacity = (item: MenuItem, focused: boolean, theme: Required<TitleBarTheme>): number => {
  if (!focused) {
    return theme.bar.inActiveOpacity!;
  }

  if (item.disabled) {
    return theme.menu.item!.disabledOpacity!;
  }

  return 1;
};

const useAltLabel = (l?: string): { first?: string, rest?: string } => {
  const [label, setLabel] = useState({
    first: l?.slice(0, 1),
    rest: l?.slice(1)
  });

  useEffect(() => {
    setLabel({
      first: l?.slice(0, 1),
      rest: l?.slice(1)
    });
  }, [l]);

  return label;
};

const MenuButton = ({
  focused,
  currentWindow,
  item,
  altKey,
  myRef,
  style,
  idx,
  depth,
  selectedPath,
  dispatch,
  icon
}: FullMenuBottonProps) => {
  const theme = useContext(ThemeContext);
  // eslint-disable-next-line no-unused-vars
  const [hoverRef, hovering] = useHover<HTMLButtonElement>();
  const bounds = useRect(hoverRef);
  const label = useAltLabel(item.label);
  const onClose = useCallback(() => {
    if (hoverRef.current) {
      hoverRef.current.blur();
    }
    dispatch({ type: 'set', depth, selected: -1 });
  }, [hoverRef.current]);
  const onClick = useCallback(() => {
    if (!item.disabled) {
      dispatch({ type: 'button-set', depth, selected: idx });
    }
  }, [idx]);

  useEffect(() => {
    if (currentSelected(selectedPath, depth) >= 0 && hovering) {
      onClick();
    }
  }, [hovering]);

  const selected = currentSelected(selectedPath, depth) === idx;
  const selectedSub =
    selected && currentSelected(selectedPath, depth + 1) !== null;

  const backgroundColor = getBackgroundColor(item, selected, hovering, theme);
  const color = getColor(item, selected, theme);
  const opacity = getOpacity(item, focused, theme);
  const isSubMenu = isItemSubMenu(item);
  const textDecoration = !item.disabled && altKey ? 'underline' : 'none';

  return (
    <div
      className={styles.MenuButtonContainer}
      style={{
        ...style,
        backgroundColor
      }}
      ref={myRef}
      tabIndex={0}
      aria-haspopup
    >
      {!item.disabled && isSubMenu && selectedSub && (
        <MenuList
          key={depth}
          menu={item.submenu!}
          ref={myRef}
          currentWindow={currentWindow}
          depth={depth + 1}
          selectedPath={selectedPath}
          dispatch={dispatch}
        />
      )}
      {selectedSub && (
        <div
          className={styles.MenuOverlay}
          style={{
            background: theme.menu.overlay!.background,
            opacity: theme.menu.overlay!.opacity,
            top: bounds.bottom,
            zIndex: theme.menu.overlay!.zIndex!
          }}
          onClick={onClose}
        />
      )}
      <div className={styles.MenuButtonWrapper}>
        <button
          ref={hoverRef}
          className={styles.MenuButton}
          style={{
            color
          }}
          onClick={onClick}
          tabIndex={-1}
        >
          <div className={styles.MenuButtonLabelWrapper} style={{ opacity }}>
            {icon}
            {!icon && (
              // eslint-disable-next-line react/jsx-fragments
              <Fragment>
                <span
                  className={styles.MenuButtonLabel}
                  style={{
                    textDecoration
                  }}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  {label.first}
                </span>
                <span
                  className={styles.MenuButtonLabel}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  {label.rest}
                </span>
              </Fragment>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

// export default MenuButton;

export default React.forwardRef<HTMLDivElement, MenuButtonProps>((props, ref) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MenuButton {...props} myRef={ref as React.RefObject<HTMLDivElement>} />
  )
});
