import { useState, useLayoutEffect } from 'react';

const useLayoutBounds = (bounds, depth) => {
  const [layout, setLayout] = useState({
    top: `${bounds.bottom}px`,
    left: `${bounds.left}px`
  });
  useLayoutEffect(() => {
    if (depth > 1) {
      if (window.innerWidth <= bounds.right + 200) {
        setLayout({
          top: `${bounds.bottom - 5}px`,
          left: `${bounds.left + 24}px`
        });
      } else {
        setLayout({
          top: `${bounds.top - 5}px`,
          left: `${bounds.right}px`
        });
      }
    }
  }, [bounds, depth]);
  return layout;
};

export default useLayoutBounds;
