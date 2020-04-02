import React, { useEffect, useRef, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import MenuButton from './menu-button';
import {
  useChildRefs,
  useWidth,
  usePrevious,
  useOverflow,
  useAccessibility,
  useKeys
} from '../effects';
import { immutableSplice } from '../utils';
import reducer, { initialState } from './reducer';

const overflowItem = menu => {
  return {
    label: '...',
    submenu: menu
  };
};

const depth = 0;
const HorizontalMenu = ({ menu, focused, currentWindow, menuBar }) => {
  const overflowRef = useRef();
  const keys = useKeys();
  const childRefs = useChildRefs(menu);
  const overflow = useOverflow(menu, menuBar, childRefs, overflowRef);
  const [fixedMenu, updateFixedMenu] = useState(
    immutableSplice(menu, overflow.index, 0, overflowItem(overflow.menu))
  );
  const width = useWidth();
  const prevWidth = usePrevious(width);
  const [selectedPath, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    updateFixedMenu(
      immutableSplice(menu, overflow.index, 0, overflowItem(overflow.menu))
    );
  }, [overflow]);

  useEffect(() => {
    // close menu when focused away from window
    // close menu when resizing the window
    if ((!focused && selectedPath[depth] >= 0) || prevWidth !== width) {
      dispatch({ type: 'reset' });
    }
  }, [focused, width]);

  useAccessibility(
    fixedMenu,
    overflow,
    childRefs,
    overflowRef,
    selectedPath,
    currentWindow,
    dispatch
  );

  return fixedMenu.map((menuItem, i) => {
    const overflowButton = overflow.index === i;
    const overflowedItem = i > overflow.index;
    const currRef = overflowButton
      ? overflowRef
      : childRefs[overflowedItem ? i - 1 : i];
    const style = overflowButton ? {
      visibility: overflow.hide ? 'hidden' : 'visible'
    } : {};
    return (
      <MenuButton
        // eslint-disable-next-line react/no-array-index-key
        key={`${menuItem.label}-${depth}-${i}`}
        ref={currRef}
        focused={focused}
        idx={i}
        overflowed={overflowedItem}
        item={menuItem}
        currentWindow={currentWindow}
        style={style}
        depth={depth}
        selectedPath={selectedPath}
        dispatch={dispatch}
        keys={keys}
      />
    );
  });
};

HorizontalMenu.propTypes = {
  menu: PropTypes.array,
  focused: PropTypes.bool,
  currentWindow: PropTypes.object,
  menuBar: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
};

export default React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <HorizontalMenu {...props} menuBar={ref} />
));
