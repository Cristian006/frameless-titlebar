import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuItem from '../MenuItem';

const MenuItemWrapper = styled(MenuItem)`
  min-width: 0;
  position: relative;
`;

const SubMenuWrapper = styled.div`
  top: 0;
  left: 100%;
  margin-top: -1px;
`;

export default class SubMenu extends Component {
  generateMenu = (menu = []) => {
    return menu.map((menuItem, i) => {
      if (menuItem.submenu) {
        // create submenu item
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            label={menuItem.label}
            menu={menuItem.submenu}
          />
        );
      }
      return (
        <MenuItem
          key={`${i}${menuItem.label}`}
          label={menuItem.label}
          onClick={menuItem.click}
        />
      );
    });
  }

  render() {
    const {
      open,
      closed,
      menu,
      label
    } = this.props;

    return (
      <MenuItemWrapper label={label} showArrow>
        <SubMenuWrapper>
          {
            this.generateMenu(menu)
          }
        </SubMenuWrapper>
      </MenuItemWrapper>
    );
  }
}

SubMenu.propTypes = {
  menu: PropTypes.array,
};
