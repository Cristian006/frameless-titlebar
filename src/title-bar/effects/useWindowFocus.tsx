import { useEffect, useState } from 'react';

const useWindowFocus = (): boolean => {
  const [focused, setFocused] = useState(document.hasFocus());
  useEffect(() => {
    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = () => {
      setFocused(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return focused;
};

export default useWindowFocus;
