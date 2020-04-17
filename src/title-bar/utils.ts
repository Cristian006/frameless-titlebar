import { MenuItem, TitleBarTheme, RectResult, OverflowState } from "./typings";

export const isItemSubMenu = (item?: MenuItem): boolean => (item?.submenu ?? false) && Array.isArray(item!.submenu);

export const isItemSeparator = (item?: MenuItem) => item && item.type && item.type.toLowerCase() === 'separator';

export const getCurrentRef = (
  childRefs: React.RefObject<HTMLElement>[],
  index: number,
  overflow?: OverflowState,
  overflowRef?: React.RefObject<HTMLElement>,
) => {
  if (overflow) {
    return overflow.index === index
      ? overflowRef
      : childRefs[index > overflow.index ? index - 1 : index];
  }
  return childRefs[index];
};

export const toggleCheckedState = (menu: MenuItem[], index: number, radio: boolean = false) => {
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

export const calcMaximums = (bounds: RectResult, theme: Required<TitleBarTheme>): [number, number] => {
  return [
    /* Max Height */ Math.max(0, window.innerHeight - bounds.top - theme!.menu!.list!.marginBottom!),
    /* Max Width */ Math.min(window.innerWidth, window.innerWidth - bounds.left)
  ];
};

export const menuItemClick = (
  e: any,
  idx: number,
  item: MenuItem,
  menu: MenuItem[],
  dispatch: any,
  currentWindow?: object
) => {
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

export const currentSelected = (selectedPath: number[], depth: number): number => {
  if (depth < selectedPath.length) {
    return selectedPath[depth];
  }
  return -2;
};

export const getSelectedMenu = (menu: MenuItem[], selected: number[]): [MenuItem[], number] => {
  let m = menu;
  for (let i = 0; i < selected.length; i += 1) {
    const level = m[selected[i]];
    if (isItemSubMenu(level) && i < selected.length - 1) {
      m = level.submenu!;
    } else {
      return [m, i];
    }
  }
  return [[], -1];
};

export const getSelectedItem = (menu: MenuItem[], selected: number[]): [MenuItem, number, MenuItem[], number] => {
  const [m, d] = getSelectedMenu(menu, selected);
  return [m[selected[d]], selected[d], m, d];
};

export const validNext = (menu: MenuItem[], start: number, maxIndex?: number): number => {
  const current = start + 1;
  const max = maxIndex ?? menu.length;
  for (let index = 0; index < max; index += 1) {
    const i = (current + index) % max;
    if (!menu[i].disabled && !isItemSeparator(menu[i])) {
      return i;
    }
  }
  return start;
};

export const validPrevious = (menu: MenuItem[], start: number, maxIndex?: number): number => {
  const current = start - 1;
  const max = maxIndex ?? menu.length;
  for (let index = max; index >= 0; index -= 1) {
    const i = (index + current) % max;
    if (!menu[i].disabled && !isItemSeparator(menu[i])) {
      return i;
    }
  }
  return start;
};

export const getValidItem = (menu: MenuItem[], selected: number[], prev: boolean = false) => {
  const [, itemIdx, m, d] = getSelectedItem(menu, selected);
  return [prev ? validPrevious(m, itemIdx) : validNext(m, itemIdx), d];
};

export const immutableSplice = <T>(arr: T[], start: number, deleteCount: number, ...items: T[]): T[] => {
  return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)];
};
