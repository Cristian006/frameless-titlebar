import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import SubMenu, { SubMenuLabelStyle } from './SubMenu';
import { defaultMenuItem } from '../../utils';
import css from './styles.css';
import MenuListContainer from './MenuListContainer';

const styles = {
  Wrapper: {
    zIndex: 8,
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  Overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  FoldOut: {
    background: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0
  },
  MenuPane: {
    pointerEvents: 'all',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  MenuFoldOut: {
    paddingTop: 5,
    paddingBottom: 5
  }
}

class MenuList extends Component {
  constructor(props) {
    super(props);
    this._generateMenu = this._generateMenu.bind(this);
  }

  _generateMenu(menu = []) {
    const { theme, parentRef } = this.props;
    const rect = parentRef.getBoundingClientRect();
    return menu.map((menuItem, i) => {
      if (menuItem.submenu || (menuItem.type && menuItem.type.toLowerCase() === 'submenu')) {
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            parentRect={rect}
            theme={theme}
            menuRef={this.props.menuRef}
            changeCheckState={this.props.changeCheckState}
            menuItem={{ ...defaultMenuItem, ...menuItem, type: 'submenu' }}
            path={this.props.vertical ? [...this.props.path, i, 'submenu'] : [...this.props.path, 'submenu', i, 'submenu']}
          />
        );
      }
      return (
        <MenuItem
          key={`${i}${menuItem.label}`}
          menuItem={{ ...defaultMenuItem, ...menuItem }}
          changeCheckState={this.props.changeCheckState}
          menuRef={this.props.menuRef}
          theme={theme}
          indx={i}
          path={this.props.vertical ? [...this.props.path] : [...this.props.path, 'submenu']}
        />
      );
    });
  }

  render() {
    const {
      submenu,
      theme
    } = this.props;

    const rect = this.props.parentRef.getBoundingClientRect();

    return (
      <div
        style={{
          ...styles.Wrapper,
          top: rect.bottom
        }}
      >
        <div
          className={css.MenuListOverlay}
          style={{
            ...styles.Overlay,
            background: theme.menuOverlayBackground,
            opacity: theme.menuOverlayOpacity
          }}
          tabIndex="-1"
        />
        <MenuListContainer
          theme={theme}
          rect={rect}
        >
          {
            (theme.menuStyle === 'vertical' && theme.menuSubLabelHeaders) &&
              <div
                style={{
                  ...SubMenuLabelStyle,
                  color: theme.menuSubLabelColor
                }}
                key="main-menu-sublabel"
              >
                Menu
              </div>
          }
          {this._generateMenu(submenu)}
        </MenuListContainer>
      </div>
    );
  }
}

MenuList.propTypes = {
  submenu: PropTypes.array,
  path: PropTypes.array,
  changeCheckState: PropTypes.func
};

MenuList.defaultProps = {
  submenu: [],
  path: [],
  changeCheckState: () => {}
};

export default MenuList;
