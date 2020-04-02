export const isItemSubMenu = item =>
  item && item.submenu && Array.isArray(item.submenu);

export const isItemSeparator = item =>
  item && item.type && item.type.toLowerCase() === 'separator';

export const getCurrentRef = (childRefs, overflowRef, index, overflow) => {
  if (overflow) {
    return overflow.index === index
      ? overflowRef
      : childRefs[index > overflow ? index - 1 : index];
  }
  return childRefs[index];
};

export const toggleCheckedState = (menu, index, radio = false) => {
  if (!radio) {
    // eslint-disable-next-line no-param-reassign
    menu[index].checked = !menu[index].checked;
    return;
  }
  menu.forEach((item, idx) => {
    if (item.type === 'radio') {
      // eslint-disable-next-line no-param-reassign
      item.checked = index === idx;
    }
  });
};

export const calcMaximums = (bounds, theme) => {
  return [
    /* Max Height */ Math.max(
      10,
      window.innerHeight - bounds.top - theme.menuMarginBottom
    ),
    /* Max Width */ Math.min(window.innerWidth, window.innerWidth - bounds.left)
  ];
};

export const menuItemClick = (e, idx, item, menu, dispatch, currentWindow) => {
  if (item.disabled === true || !item.click) {
    e.stopPropagation();
    return;
  }

  switch (item.type) {
    case 'submenu':
      break;
    case 'radio': {
      toggleCheckedState(menu, idx, true);
      item.click(item, currentWindow, e);
      break;
    }
    case 'checkbox': {
      toggleCheckedState(menu, idx);
      item.click(item, currentWindow, e);
      break;
    }
    default:
      item.click(item, currentWindow, e);
      break;
  }
  dispatch({ type: 'reset' });
};

export const currentSelected = (selectedPath, depth) => {
  if (depth < selectedPath.length) {
    return selectedPath[depth];
  }
  return null;
};

export const getSelectedMenu = (menu, selected) => {
  let m = menu;
  for (let i = 0; i < selected.length; i += 1) {
    const level = m[selected[i]];
    if (isItemSubMenu(level) && i < selected.length - 1) {
      m = level.submenu;
    } else {
      return [m, i];
    }
  }
};

export const getSelectedItem = (menu, selected) => {
  const [m, d] = getSelectedMenu(menu, selected);
  return [m[selected[d]], selected[d], m, d];
};

export const validNext = (menu, start) => {
  const current = start + 1;
  for (let index = 0; index < menu.length; index += 1) {
    const i = (current + index) % menu.length;
    if (!menu[i].disabled && !isItemSeparator(menu[i])) {
      return i;
    }
  }
  return start;
};

const validPrevious = (menu, start) => {
  const current = start - 1;
  for (let index = menu.length; index >= 0; index -= 1) {
    const i = (index + current) % menu.length;
    if (!menu[i].disabled && !isItemSeparator(menu[i])) {
      return i;
    }
  }
  return start;
};

export const getValidItem = (menu, selected, prev = false) => {
  const [, itemIdx, m, d] = getSelectedItem(menu, selected);
  return [prev ? validPrevious(m, itemIdx) : validNext(m, itemIdx), d];
};

export const immutableSplice = (arr, start, deleteCount, ...items) => {
  return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)];
};
