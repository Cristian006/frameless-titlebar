import { useEffect, useCallback } from 'react';
import {
  isItemSubMenu,
  getSelectedItem,
  getValidItem,
  validNext,
  getCurrentRef,
  menuItemClick
} from '../utils';

const depth = 0;
const useAccessibility = (
  menu,
  overflow,
  childRefs,
  overflowRef,
  selectedPath,
  currentWindow,
  dispatch
) => {
  const callback = useCallback(
    e => {
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
          const maxIndex =
            overflow && overflow.hide ? menu.length - 2 : menu.length - 1;
          const next = current < maxIndex ? current + 1 : 0;
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
            const maxIndex =
              overflow && overflow.hide ? menu.length - 2 : menu.length - 1;
            const next = current > 0 ? current - 1 : maxIndex;
            // console.log(next);
            dispatch({ type: 'button-set', depth, selected: next });
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
    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, [callback]);
};

export default useAccessibility;
