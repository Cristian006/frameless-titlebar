import { useState, useEffect, createRef } from 'react';

const createRefs = children =>
  Array(children.length)
    .fill(0)
    .map(() => createRef());

const useChildRefs = children => {
  const [refs, setRefs] = useState(createRefs(children));
  useEffect(() => {
    setRefs(createRefs(children));
  }, [children]);

  return refs;
};

export default useChildRefs;
