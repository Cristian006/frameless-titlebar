import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem';
import { defaultMenuItem } from '../../../utils';
import MenuListContainer from '../MenuListContainer';

export const SubMenuLabelStyle = {
  height: '20px',
  lineHeight: '20px',
  margin: '0px 10px',
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  direction: 'rtl',
  fontSize: '1em',
  textAlign: 'left',
  cursor: 'default',
};

class SubMenu extends Component {
  constructor(props) {
    super(props);
    this._generateMenu = this._generateMenu.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  setRef(ref) {
    this.itemRef = ref;
  }

  _generateMenu(menu = []) {
    const { theme } = this.props;
    return menu.map((menuItem, i) => {
      if (menuItem.submenu) {
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            theme={theme}
            menuRef={this.props.menuRef}
            changeCheckState={this.props.changeCheckState}
            menuItem={{ ...defaultMenuItem, ...menuItem, type: 'submenu' }}
            path={[...this.props.path, i, 'submenu']}
          />
        );
      }

      return (
        <MenuItem
          indx={i}
          key={`${i}${menuItem.label}`}
          theme={theme}
          changeCheckState={this.props.changeCheckState}
          menuItem={{ ...defaultMenuItem, ...menuItem }}
          menuRef={this.props.menuRef}
          path={[...this.props.path]}
        />
      );
    });
  }

  render() {
    const {
      menuItem,
      // renderSide,
      theme
    } = this.props;

    return (
      <MenuItem
        rectRef={this.setRef}
        menu={this.props.menu}
        theme={theme}
        menuItem={{ ...defaultMenuItem, ...menuItem }}
      >
        <MenuListContainer
          theme={theme}
          parentRef={this.itemRef}
          rect={this.itemRef && this.itemRef.getBoundingClientRect()}
          submenu
        >
          {
            theme.menuSubLabelHeaders &&
            <div
              style={{
                ...SubMenuLabelStyle,
                color: theme.menuSubLabelColor
              }}
            >
              {menuItem.label}
            </div>
          }
          {
            this._generateMenu(menuItem.submenu)
          }
        </MenuListContainer>
      </MenuItem>
    );
  }
}

SubMenu.propTypes = {
  menuItem: PropTypes.object,
  level: PropTypes.number,
  renderSide: PropTypes.string,
  changeCheckState: PropTypes.func
};

SubMenu.defaultProps = {
  menuItem: {},
  level: 1,
  renderSide: 'right',
  changeCheckState: () => {}
};

export default SubMenu;
