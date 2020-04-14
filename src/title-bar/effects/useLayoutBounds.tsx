import { useState, useLayoutEffect } from 'react';
import { RectResult } from '../typings';

const SUB_LABEL_HEIGHT = 20;
const MENU_PADDING = 5;
const OVERLAY_OFFSET = 24;
const getTopOffset = (depth: number, hasSubLabel: boolean): number => {
  if (depth > 1) {
    return hasSubLabel ? SUB_LABEL_HEIGHT : MENU_PADDING;
  }
  return 0;
}

const useLayoutBounds = (bounds: RectResult, depth: number, hasSubLabel: boolean): { top: string, left: string } => {
  const [layout, setLayout] = useState({
    top: `${bounds.bottom - getTopOffset(depth, hasSubLabel)}px`,
    left: `${bounds.left}px`
  });
  useLayoutEffect(() => {
    if (depth > 1) {
      if (window.innerWidth <= bounds.right + 200) {
        setLayout({
          top: `${bounds.bottom - getTopOffset(depth, hasSubLabel)}px`,
          left: `${bounds.left + OVERLAY_OFFSET}px`
        });
      } else {
        setLayout({
          top: `${bounds.top - getTopOffset(depth, hasSubLabel)}px`,
          left: `${bounds.right}px`
        });
      }
    }
  }, [bounds, depth, hasSubLabel]);
  return layout;
};

export default useLayoutBounds;
