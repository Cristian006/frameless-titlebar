import { useState, useRef, useEffect } from 'react';

export default function useHover<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  // Reference to the element we're listen for events from
  const ref = useRef<T>(null);

  // Hover state management
  const [hovered, setHovered] = useState(false);

  // Simple effect, just bind and unbind the event handlers
  useEffect(() => {
    const node = ref.current;
    if (node) {
      // Event handlers
      const enter = () => setHovered(true);
      const leave = () => setHovered(false);

      node.addEventListener('mouseenter', enter);
      node.addEventListener('mouseleave', leave);
      return () => {
        node.removeEventListener('mouseenter', enter);
        node.removeEventListener('mouseleave', leave);
      };
    }
    return
  }, [ref.current]);

  return [ref, hovered];
}
