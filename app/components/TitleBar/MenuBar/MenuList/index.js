import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const Wrapper = styled.div`
  min-width: 0;
  position: relative;
`;

export default class MenuList extends Component {
  generateMenu = (menu = []) => {
    return menu.map((menuItem) => {
      if (menuItem.submenu) {
        // create submenu item
        return (
          <SubMenu
            label={menuItem.label}
            menu={menuItem.submenu}
          />
        );
      }
      return (
        <MenuItem
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
    } = this.props;

    return (
      <Wrapper>
        {this.generateMenu(menu)}
      </Wrapper>
    );
  }
}

MenuList.propTypes = {
  menu: PropTypes.array,
};
