import { useLayoutEffect } from 'react';

const useScrollFocus = (
  currentIndex,
  menuItemHeight,
  parentBounds,
  scrollRef
) => {
  useLayoutEffect(() => {
    if (currentIndex >= 0 && scrollRef.current) {
      const menuItemBounds = menuItemHeight * currentIndex + menuItemHeight;
      const { scrollTop, clientHeight } = scrollRef.current;
      if (menuItemBounds > clientHeight) {
        // eslint-disable-next-line no-param-reassign
        scrollRef.current.scrollTop = menuItemBounds;
      } else if (menuItemBounds < scrollTop) {
        // eslint-disable-next-line no-param-reassign
        scrollRef.current.scrollTop = menuItemBounds - menuItemHeight;
      }
    }
  }, [currentIndex, menuItemHeight, parentBounds, scrollRef.current]);
};

export default useScrollFocus;
