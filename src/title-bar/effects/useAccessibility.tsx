import { useEffect, useCallback } from 'react';
import {
  isItemSubMenu,
  getSelectedItem,
  getValidItem,
  validNext,
  getCurrentRef,
  menuItemClick,
  validPrevious
} from '../utils';
import { MenuItem, OverflowState } from '../typings';

const altKeyCodeMatch = (e: any, str?: string) => {
  return !!e.altKey && e.keyCode === str?.charCodeAt(0);
};

const depth = 0;
const useAccessibility = (
  menu: MenuItem[],
  childRefs: React.RefObject<HTMLElement>[],
  selectedPath: number[],
  dispatch: any,
  altKey: boolean,
  overflowRef?: React.RefObject<HTMLElement>,
  overflow?: OverflowState,
  currentWindow?: object,
) => {
  const resetKeys = useCallback(() => {
    dispatch({
      type: 'alt',
      altKey: false
    });
  }, [dispatch]);

  const callback = useCallback(e => {
    if (e.altKey) {
      e.preventDefault();
      if (!altKey) {
        dispatch({
          type: 'alt',
          altKey: true
        });
      }
      // if the keycode is not alt
      if (e.keyCode !== 18) {
        let firstIndex = menu!.findIndex(x => (!x.disabled && altKeyCodeMatch(e, x.label)));
        if (firstIndex >= 0) {
          const maxIndex = Math.min(firstIndex, overflow && overflow.hide ? menu.length - 1 : menu.length)
          dispatch({
            type: 'button-set',
            depth,
            selected: maxIndex
          })
        }
      }
      return;
    }

    const current = selectedPath[depth];
    if (current < 0) return;
    switch (e.keyCode) {
      case 13 /* enter */: {
        e.preventDefault();
        e.stopImmediatePropagation();
        const [selectedItem, selectedIndex, selectedMenu] = getSelectedItem(
          menu,
          selectedPath
        );
        if (isItemSubMenu(selectedItem)) {
          dispatch({
            type: 'set',
            depth: selectedPath.length + 1,
            selected: validNext(selectedItem.submenu!, -1)
          });
          break;
        }
        menuItemClick(
          e,
          selectedIndex,
          selectedItem,
          selectedMenu,
          dispatch,
          currentWindow
        );
        break;
      }
      case 27 /* esc */: {
        e.preventDefault();
        const currRef = getCurrentRef(
          childRefs,
          current,
          overflow,
          overflowRef,
        );
        currRef?.current?.blur();
        dispatch({ type: 'reset' });
        break;
      }
      case 40 /* down */: {
        e.preventDefault();
        const [next, selectedDepth] = getValidItem(menu, selectedPath);
        dispatch({
          type: 'set',
          depth: selectedDepth,
          selected: next
        });
        break;
      }
      case 39 /* right */: {
        e.preventDefault();
        const [selectedItem] = getSelectedItem(menu, selectedPath);
        if (isItemSubMenu(selectedItem)) {
          dispatch({
            type: 'set',
            depth: selectedPath.length + 1,
            selected: validNext(selectedItem.submenu!, -1)
          });
          break;
        }
        const next = validNext(menu, current, overflow && overflow.hide ? menu.length - 1 : overflow!.index + 1);
        dispatch({ type: 'button-set', depth, selected: next });
        break;
      }
      case 38 /* up */: {
        e.preventDefault();
        const [prev, selectedDepth] = getValidItem(menu, selectedPath, true);
        dispatch({
          type: 'set',
          depth: selectedDepth,
          selected: prev
        });
        break;
      }
      case 37 /* left */:
        e.preventDefault();
        if (selectedPath.length <= 2) {
          const prev = validPrevious(menu, current, overflow && overflow.hide ? menu.length - 1 : overflow!.index + 1);
          dispatch({ type: 'button-set', depth, selected: prev });
          break;
        }
        dispatch({ type: 'del', depth: selectedPath.length - 1 });
        break;
      default:
          /* do nothing */ break;
    }
  },
    [
      menu,
      overflow,
      childRefs,
      overflowRef,
      selectedPath,
      currentWindow,
      dispatch
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', callback);
    window.addEventListener('keyup', resetKeys);
    return () => {
      window.removeEventListener('keydown', callback);
      window.addEventListener('keyup', resetKeys);
    };
  }, [callback, resetKeys]);
};

export default useAccessibility;
