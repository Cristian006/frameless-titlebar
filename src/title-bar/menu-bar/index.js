import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../theme';
import HorizontalMenu from './horizontal';
import VerticalMenu from './vertical';
import { useMenu } from '../effects';
import styles from '../style.css';

const MenuBar = ({ menu, focused, currentWindow }) => {
  const currentTheme = useContext(ThemeContext);
  const menuBar = useRef();
  const currentMenu = useMenu(menu);

  return (
    <div className={styles.MenuBar} role="menubar" ref={menuBar}>
      {currentTheme.menuStyle === 'vertical' ? (
        <VerticalMenu
          menu={currentMenu}
          focused={focused}
          currentWindow={currentWindow}
        />
      )
        : (
          <HorizontalMenu
            menu={currentMenu}
            ref={menuBar}
            focused={focused}
            currentWindow={currentWindow}
          />
        )}
    </div>
  );
};

MenuBar.propTypes = {
  menu: PropTypes.array,
  focused: PropTypes.bool,
  currentWindow: PropTypes.object
};

export default MenuBar;
