import { useLayoutEffect, useCallback, useState } from "react";
import { RectResult } from "../typings";

function getRect<T extends HTMLElement>(element?: T): RectResult {
  let rect: RectResult = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  };
  if (element) rect = element.getBoundingClientRect();
  return rect;
}

export default function useRect<T extends HTMLElement>(
  ref: React.RefObject<T>
): RectResult {
  const [rect, setRect] = useState<RectResult>(
    ref && ref.current ? getRect(ref.current) : getRect()
  );

  const handleResize = useCallback(() => {
    if (!ref.current) return;
    setRect(getRect(ref.current)); // Update client rect
  }, [ref.current]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    handleResize();

    // @ts-ignore
    if (typeof ResizeObserver === "function") {
      // @ts-ignore
      let resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(element);
      return () => {
        if (!resizeObserver) return;
        resizeObserver.disconnect();
        resizeObserver = null;
      };
    } else {
      window.addEventListener("resize", handleResize); // Browser support, remove freely
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [ref.current]);

  return rect;
}
