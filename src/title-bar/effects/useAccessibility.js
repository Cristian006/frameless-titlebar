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

const altKeyCodeMatch = (e, str) => {
  return !!e.altKey && e.keyCode === str.charCodeAt(0);
};

const depth = 0;
const useAccessibility = (
  menu,
  overflow,
  childRefs,
  overflowRef,
  selectedPath,
  currentWindow,
  dispatch,
  altKey
) => {
  const resetKeys = useCallback(e => {
    dispatch({
      type: 'alt',
      altKey: false
    });
  }, []);

  const callback = useCallback(e => {
    if (e.altKey) {
      e.preventDefault();
      if (!altKey) {
        dispatch({
          type: 'alt',
          altKey: true
        });
      }
      let firstIndex = menu.findIndex(x => (!x.disabled && altKeyCodeMatch(e, x.label)));
      if (firstIndex >= 0) {
        const maxIndex = Math.min(firstIndex, overflow && overflow.hide ? menu.length - 1 : menu.length)
        dispatch({
          type: 'button-set',
          depth,
          selected: maxIndex
        })
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
            selected: validNext(selectedItem.submenu, -1)
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
        const currRef = getCurrentRef(
          childRefs,
          overflowRef,
          current,
          overflow
        );
        currRef.current.blur();
        dispatch({ type: 'reset' });
        break;
      }
      case 40 /* down */: {
        const [next, selectedDepth] = getValidItem(menu, selectedPath);
        dispatch({
          type: 'set',
          depth: selectedDepth,
          selected: next
        });
        break;
      }
      case 39 /* right */: {
        const [selectedItem] = getSelectedItem(menu, selectedPath);
        if (isItemSubMenu(selectedItem)) {
          dispatch({
            type: 'set',
            depth: selectedPath.length + 1,
            selected: validNext(selectedItem.submenu, -1)
          });
          break;
        }
        console.log(overflow);
        const next = validNext(menu, current, overflow && overflow.hide ? menu.length - 1 : menu.length - 2);
        // const maxIndex =
        //  overflow && overflow.hide ? menu.length - 2 : menu.length - 1;
        // const next = current < maxIndex ? current + 1 : 0;
        dispatch({ type: 'button-set', depth, selected: next });
        break;
      }
      case 38 /* up */: {
        const [prev, selectedDepth] = getValidItem(menu, selectedPath, true);
        dispatch({
          type: 'set',
          depth: selectedDepth,
          selected: prev
        });
        break;
      }
      case 37 /* left */:
        if (selectedPath.length <= 2) {
          const prev = validPrevious(menu, current, overflow && overflow.hide ? menu.length - 1 : menu.length - 2);
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
