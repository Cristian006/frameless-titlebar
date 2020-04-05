import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const getStatusIcon = item => {
  switch (item.type) {
    case 'radio':
      return item.checked ? RadioChecked : RadioUnchecked;
    case 'checkbox':
      return item.checked ? Checked : Unchecked;
    default: {
      if (item.icon) {
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

const getTextColor = (item, hovering, theme) => {
  if (hovering && !item.disabled) {
    return theme.menu.item.highlight.color;
  }
  return theme.menu.item.color;
};

const getIconColor = (item, hovering, theme) => {
  if (hovering && !item.disabled) {
    return theme.menu.item.highlight.color;
  }
  if (theme.menu.icon.highlight) {
    return theme.menu.item.highlight.color;
  }
  return theme.menu.item.color;
};

const getAcceleratorColor = (item, hovering, theme) => {
  return hovering && !item.disabled ? theme.menu.item.highlight.color : theme.menu.accelerator.color;
};

const getBackgroundColor = (hovering, item, theme) => {
  return hovering && !item.disabled ? theme.menu.item.highlight.background : '';
};

const MenuItem = ({
  item,
  maxWidth,
  onClick,
  currentWindow,
  depth,
  dispatch,
  selectedPath,
  idx
}) => {
  if (item.hidden === true) {
    return null;
  }
  const theme = useContext(ThemeContext);
  if (isItemSeparator(item)) {
    return (
      <hr
        className={styles.Separator}
        style={{ borderBottom: `1px solid ${theme.menu.separator.color}` }}
      />
    );
  }

  const isSubMenu = isItemSubMenu(item);
  const [ref, hovering] = useHover();
  useEffect(() => {
    if (hovering) {
      dispatch({ type: isSubMenu ? 'hover-sub' : 'set', depth, selected: idx });
    }
  }, [hovering, depth]);

  const selected = currentSelected(selectedPath, depth) === idx;
  const selectedSub =
    selected && currentSelected(selectedPath, depth + 1) !== null;
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
          height: theme.menu.item.height,
          maxWidth
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
          menu={item.submenu}
          ref={ref}
          currentWindow={currentWindow}
          depth={depth + 1}
          selectedPath={selectedPath}
          dispatch={dispatch}
        />
      )}
    </li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  maxWidth: PropTypes.number,
  onClick: PropTypes.func,
  currentWindow: PropTypes.object,
  depth: PropTypes.number,
  idx: PropTypes.number,
  dispatch: PropTypes.func,
  selectedPath: PropTypes.array
};

export default MenuItem;
