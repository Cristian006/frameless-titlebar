import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import MenuButton from './menu-button';
import {
  useChildRefs,
  useWidth,
  usePrevious,
  useAccessibility
} from '../effects';
import reducer, { initialState } from './reducer';
import { MenuIcon } from './icons';

const menuButton = menu => {
  return {
    id: 'menu-button',
    label: 'Menu',
    submenu: menu
  };
};

const depth = 0;
const VerticalMenu = ({ menu, focused, currentWindow }) => {
  const [fixedMenu, updateFixedMenu] = useState([menuButton(menu)]);
  const childRefs = useChildRefs(fixedMenu);
  const width = useWidth();
  const prevWidth = usePrevious(width);
  const [{ selectedPath, altKey }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // close menu when focused away from window
    // close menu when resizing the window
    if ((!focused && selectedPath[depth] >= 0) || prevWidth !== width) {
      dispatch({ type: 'reset' });
    }
  }, [focused, width]);

  useEffect(() => {
    updateFixedMenu([menuButton(menu)]);
  }, [menu]);

  useAccessibility(
    fixedMenu,
    null,
    childRefs,
    null,
    selectedPath,
    currentWindow,
    dispatch
  );

  return (
    <MenuButton
      ref={childRefs[0]}
      focused={focused}
      idx={0}
      overflowed={false}
      item={fixedMenu[0]}
      currentWindow={currentWindow}
      depth={depth}
      selectedPath={selectedPath}
      dispatch={dispatch}
      icon={<MenuIcon />}
      altKey={false}
    />
  );
};

VerticalMenu.propTypes = {
  menu: PropTypes.array,
  focused: PropTypes.bool,
  currentWindow: PropTypes.object
}

export default VerticalMenu;
