import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import { ThemeContext } from '../theme';
import MenuList from './menu-list';
import { currentSelected, isItemSubMenu } from '../utils';
import styles from '../style.css';
import { MenuButtonProps, FullMenuBottonProps, MenuButtonTheme } from '../typings';
import Button from '../components/button';

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
  const label = useAltLabel(item.label);
  const onClose = useCallback(() => {
    if (myRef.current) {
      myRef.current.blur();
    }
    dispatch({ type: 'set', depth, selected: -1 });
  }, [myRef.current]);


  const onClick = useCallback(() => {
    if (!item.disabled) {
      dispatch({ type: 'button-set', depth, selected: idx });
    }
  }, [idx]);

  const onHover = useCallback((hovering: boolean) => {
    if (currentSelected(selectedPath, depth) >= 0 && hovering) {
      onClick();
    }
  }, [myRef.current, selectedPath, depth, onClick]);

  const selected = currentSelected(selectedPath, depth) === idx;
  const isSubMenu = isItemSubMenu(item);
  const open: boolean = !(item?.disabled ?? false) && isSubMenu && selected;
  const textDecoration = !item.disabled && altKey ? 'underline' : 'none';

  return (
    <Button
      ref={myRef}
      disabled={item.disabled ?? false}
      open={open}
      theme={{ ...theme.bar.button as Required<MenuButtonTheme> }}
      focused={focused}
      style={style}
      inactiveOpacity={theme.bar.inActiveOpacity!}
      onClick={onClick}
      label={icon ?? (
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
      onOverlayClick={onClose}
      onHover={onHover}
    >
      <MenuList
        key={depth}
        menu={item.submenu ?? []}
        ref={myRef}
        currentWindow={currentWindow}
        depth={depth + 1}
        selectedPath={selectedPath}
        dispatch={dispatch}
      />
    </Button>
  );
};

export default React.forwardRef<HTMLDivElement, MenuButtonProps>((props, ref) => {
  return <MenuButton {...props} myRef={ref as React.RefObject<HTMLDivElement>} />
});
