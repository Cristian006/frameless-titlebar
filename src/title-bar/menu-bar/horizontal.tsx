import React, { useEffect, useRef, useReducer, useState, Fragment } from 'react';

import MenuButton from './menu-button';
import {
  useChildRefs,
  useWidth,
  usePrevious,
  useOverflow,
  useAccessibility
} from '../effects';
import { immutableSplice } from '../utils';
import reducer, { initialState } from './reducer';
import { HorizontalMenuProps, MenuItem } from '../typings';

const overflowItem = (menu?: MenuItem[]): MenuItem => {
  return {
    label: '...',
    submenu: menu
  };
};

const depth = 0;
const HorizontalMenu = ({ menu, focused, currentWindow, menuBar }: HorizontalMenuProps) => {
  const overflowRef = useRef<HTMLDivElement>(null);
  const childRefs = useChildRefs<HTMLDivElement>(menu);
  const overflow = useOverflow(menu, menuBar, childRefs, overflowRef);
  const [fixedMenu, updateFixedMenu] = useState(
    immutableSplice(menu, overflow.index, 0, overflowItem(overflow.menu))
  );
  const width = useWidth();
  const prevWidth = usePrevious(width);
  const [{ selectedPath, altKey }, dispatch] = useReducer(reducer, initialState);

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
    childRefs,
    selectedPath,
    dispatch,
    altKey,
    overflowRef,
    overflow,
    currentWindow
  );

  return (
    <Fragment>
      {
        fixedMenu.map((menuItem, i) => {
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
              item={menuItem}
              currentWindow={currentWindow}
              style={style}
              depth={depth}
              selectedPath={selectedPath}
              dispatch={dispatch}
              altKey={altKey}
            />
          )
        })
      }
    </Fragment>
  );
};

export default HorizontalMenu;
