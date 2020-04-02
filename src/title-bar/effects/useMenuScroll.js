import { useCallback } from 'react';

const stopScrolling = e => {
  e.preventDefault();
  e.stopPropagation();
  e.returnValue = false;
  return false;
};

const useMenuScroll = scrollRef => {
  return useCallback(
    e => {
      const { scrollTop } = scrollRef.current;
      const { scrollHeight } = scrollRef.current;
      const height = scrollRef.current.clientHeight;
      const wheelDelta = e.deltaY;
      const isDeltaPositive = wheelDelta > 0;
      const step = 10; // scroll speed

      if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
        // eslint-disable-next-line no-param-reassign
        scrollRef.current.scrollTop = scrollHeight;
        return stopScrolling(e);
      }
      if (!isDeltaPositive && -wheelDelta > scrollTop) {
        // eslint-disable-next-line no-param-reassign
        scrollRef.current.scrollTop = 0;
        return stopScrolling(e);
      }
      // eslint-disable-next-line no-param-reassign
      scrollRef.current.scrollTop += wheelDelta > 0 ? step : -step;
      return stopScrolling(e);
    },
    [scrollRef.current]
  );
};

export default useMenuScroll;
