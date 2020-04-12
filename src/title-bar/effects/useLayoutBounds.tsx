import { useState, useLayoutEffect } from 'react';
import { RectResult } from '../typings';

const useLayoutBounds = (bounds: RectResult, depth: number, hasSubLabel: boolean): { top: string, left: string } => {
  const [layout, setLayout] = useState({
    top: `${bounds.bottom - (hasSubLabel ? 20 : 5)}px`,
    left: `${bounds.left}px`
  });
  useLayoutEffect(() => {
    if (depth > 1) {
      if (window.innerWidth <= bounds.right + 200) {
        setLayout({
          top: `${bounds.bottom - (hasSubLabel ? 20 : 5)}px`,
          left: `${bounds.left + 24}px`
        });
      } else {
        setLayout({
          top: `${bounds.top - (hasSubLabel ? 20 : 5)}px`,
          left: `${bounds.right}px`
        });
      }
    }
  }, [bounds, depth, hasSubLabel]);
  return layout;
};

export default useLayoutBounds;
