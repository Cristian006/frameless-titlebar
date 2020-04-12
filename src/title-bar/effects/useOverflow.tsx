import { useState, useEffect, useRef } from 'react';
import useRect from './useRect';
import { MenuItem, OverflowState } from '../typings';

const calcMenuOverflow = (
  menu: MenuItem[],
  menuBar: React.RefObject<HTMLElement>,
  refs: React.RefObject<HTMLElement>[],
  overflowRef?: React.RefObject<HTMLElement>
): OverflowState => {
  const [overflow, setOverflow] = useState<OverflowState>({
    menu: [],
    index: menu.length,
    hide: true
  });
  const activeMenus = useRef(menu?.length ?? 0);
  const menuBarRect = useRect(menuBar);

  useEffect(() => {
    const availableSize = menuBarRect.width;
    let currentSize = 0;
    let full = false;
    const prevMenusShown = activeMenus.current;
    let numMenusShown = 0;

    refs?.forEach(mItem => {
      const node = mItem?.current;
      if (node) {
        if (!full) {
          const size = node.offsetWidth;
          if (currentSize + size > availableSize) {
            full = true;
            node.style.visibility = 'hidden';
          } else {
            currentSize += size;
            numMenusShown += 1;
            if (numMenusShown > prevMenusShown) {
              node.style.visibility = 'visible';
            }
          }
        } else {
          node.style.visibility = 'hidden';
        }
      }
    });

    if (full) {
      const overflowNode = overflowRef?.current;
      if (overflowNode) {
        while (
          currentSize + overflowNode.offsetWidth > availableSize &&
          numMenusShown > 0
        ) {
          numMenusShown -= 1;
          const item = refs[numMenusShown].current;
          currentSize -= item!.offsetWidth;
          item!.style.visibility = 'hidden';
        }
      }
      setOverflow({
        menu: [...menu.slice(numMenusShown, menu.length)],
        index: numMenusShown,
        hide: false
      });
    } else {
      setOverflow({
        menu: [],
        index: menu.length,
        hide: true
      });
    }

    activeMenus.current = numMenusShown;
  }, [menuBarRect.width, refs]);

  return overflow;
};

export default calcMenuOverflow;
