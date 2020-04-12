import { useState, useEffect, createRef } from 'react';

const createRefs = <T extends HTMLElement>(children: any[]): React.RefObject<T>[] =>
  Array(children.length)
    .fill(0)
    .map(() => createRef<T>());

const useChildRefs = <T extends HTMLElement>(children: any[]): React.RefObject<T>[] => {
  const [refs, setRefs] = useState(createRefs<T>(children));
  useEffect(() => {
    setRefs(createRefs(children));
  }, [children]);

  return refs;
};

export default useChildRefs;
