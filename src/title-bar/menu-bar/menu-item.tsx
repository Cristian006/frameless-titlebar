import React, { useContext, useEffect } from 'react';
import styles from '../style.css';
import { ThemeContext } from '../theme';
import { useHover } from '../effects';
import {
  Arrow,
  Unchecked,
  RadioUnchecked,
  RadioChecked,
  Checked
} from './icons';
import MenuList from './menu-list';
import { currentSelected, isItemSubMenu, isItemSeparator } from '../utils';
import { MenuItem, TitleBarTheme, MenuItemProps } from '../typings';

const getStatusIcon = (item: MenuItem) => {
  switch (item.type) {
    case 'radio':
      return item.checked ? RadioChecked : RadioUnchecked;
    case 'checkbox':
      return item.checked ? Checked : Unchecked;
    default: {
      if (item?.icon) {
        return (
          <div
            className={styles.MenuItemIcon}
            style={{ backgroundImage: `url(${item.icon})` }}
          />
        );
      }
      return <span />;
    }
  }
};

const getTextColor = (item: MenuItem, hovering: boolean, theme: Required<TitleBarTheme>) => {
  if (hovering && !item.disabled) {
    return theme.menu.item!.active!.color;
  }
  return theme.menu.item!.default!.color;
};

const getIconColor = (item: MenuItem, hovering: boolean, theme: Required<TitleBarTheme>) => {
  if (hovering && !item.disabled) {
    return theme.menu.item!.active!.color;
  }
  if (theme.menu.icon!.highlight) {
    return theme.menu.item!.active!.background;
  }
  return theme.menu.item!.default!.color;
};

const getAcceleratorColor = (item: MenuItem, hovering: boolean, theme: Required<TitleBarTheme>) => {
  return hovering && !item.disabled ? theme.menu.item!.active!.color : theme.menu.accelerator!.color;
};

const getBackgroundColor = (hovering: boolean, item: MenuItem, theme: Required<TitleBarTheme>) => {
  return hovering && !item.disabled ? theme.menu.item!.active!.background : '';
};

const MenuItemComponent = ({
  item,
  onClick,
  currentWindow,
  depth,
  dispatch,
  selectedPath,
  idx
}: MenuItemProps) => {
  if (item.hidden === true) {
    return null;
  }
  const theme = useContext(ThemeContext);
  if (isItemSeparator(item)) {
    return (
      <hr
        className={styles.Separator}
        style={{ borderBottom: `1px solid ${theme.menu.separator!.color}` }}
      />
    );
  }

  const isSubMenu = isItemSubMenu(item);
  const [ref, hovering] = useHover<HTMLLIElement>();
  useEffect(() => {
    if (hovering) {
      dispatch({ type: isSubMenu ? 'hover-sub' : 'set', depth, selected: idx });
    }
  }, [hovering, depth]);

  const selected = currentSelected(selectedPath, depth) === idx;
  const selectedSub =
    selected && currentSelected(selectedPath, depth + 1) >= -1;
  const textColor = getTextColor(item, selected, theme);
  const iconColor = getIconColor(item, selected, theme);
  const acceleratedColor = getAcceleratorColor(item, selected, theme);
  const backgroundColor = getBackgroundColor(selected, item, theme);
  return (
    <li
      className={styles.MenuItemContainer}
      ref={ref}
      style={{
        color: textColor,
        opacity: !item.disabled ? 1 : 0.3,
        backgroundColor
      }}
      role="option"
      onClick={onClick}
    >
      <a
        className={styles.MenuItemWrapper}
        style={{
          height: theme.menu.item!.height,
          maxWidth: theme.menu.list?.maxWidth,
          minWidth: theme.menu.list?.minWidth
        }}
      >
        <div className={styles.StatusIcon} style={{ color: iconColor }}>
          {getStatusIcon(item)}
        </div>
        <span className={styles.MenuItemLabel}>{item.label}</span>
        <span
          className={styles.Accelerator}
          style={{ color: acceleratedColor }}
        >
          {item.accelerator}
        </span>
        {isSubMenu && <div className={styles.SubMenuArrow}>{Arrow}</div>}
      </a>
      {!item.disabled && isSubMenu && selectedSub && (
        <MenuList
          key={depth}
          menu={item.submenu ?? []}
          ref={ref}
          currentWindow={currentWindow}
          depth={depth + 1}
          selectedPath={selectedPath}
          dispatch={dispatch}
          subLabel={item.label}
        />
      )}
    </li>
  );
};

export default MenuItemComponent;
