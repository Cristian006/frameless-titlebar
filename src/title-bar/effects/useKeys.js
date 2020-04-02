import { useState, useEffect } from 'react';

const keyCodes = e => ({
  charCode: e.charCode,
  which: e.which,
  keyCode: e.keyCode,
  shiftKey: e.shiftKey,
  altKey: e.altKey,
  ctrlKey: e.ctrlKey,
  metaKey: e.metaKey
});

const initialKeys = () => ({
  charCode: null,
  which: null,
  keyCode: null,
  shiftKey: null,
  altKey: null,
  ctrlKey: null,
  metaKey: null
});

const useKeys = () => {
  const [keys, setKeys] = useState(initialKeys());

  useEffect(() => {
    const captureKeyCode = e => {
      if (
        e.charCode !== keys.charCode ||
        e.which !== keys.which ||
        e.keyCode !== keys.keyCode ||
        e.shiftKey !== keys.shiftKey ||
        e.altKey !== keys.altKey ||
        e.ctrlKey !== keys.ctrlKey ||
        e.metaKey !== keys.metaKey
      ) {
        setKeys({ ...keyCodes(e) });
      }
    };
    const resetKeys = () => setKeys(initialKeys());

    window.addEventListener('keydown', captureKeyCode);
    window.addEventListener('keyup', resetKeys);
    return () => {
      window.removeEventListener('keydown', captureKeyCode);
      window.removeEventListener('keyup', resetKeys);
    };
  }, []);

  return keys;
};

export default useKeys;
