import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const Wrapper = styled.div`
  z-index: 8;
  position: absolute;
  width: 100%;
  height: calc(100% - ${props => props.rect.bottom}px);
  top: ${props => props.rect.bottom}px;
  left: 0;
`;

const FoldOut = styled.div`
  background: transparent;
  pointer-events: none;
  position: absolute;
  height: 100%;
  margin-left: ${props => props.rect.left}px;
  max-width: calc(100% - ${props => props.rect.left}px);
  overflow: hidden;
  top: 0;
  background: #fff;
  color: #24292e;
`;


const MenuFoldOut = styled.div`

`;

const MenuPane = styled.div`
  background: #fff;
  pointer-events: all;
`;

const List = styled.div`

`;

const Overlay = styled.div`
  background: black;
  opacity: 0.4;
  height: 100%;
  overflow: hidden;
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

export default class MenuList extends Component {
  getRowHeight = ({ index }) => {
    const menuListItem = this.props.menu[index];
    if (menuListItem.visiable === false) {
      return 0;
    }
    if (menuListItem.type === 'separator') {
      return 10;
    }
    return 30;
  };

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
      menu,
      rect,
    } = this.props;
    // const menuListHeight = menu.map((l, index) => this.getRowHeight({ index })).reduce((a, b) => a + b, 0);
    return (
      <Wrapper rect={rect}>
        <Overlay tabIndex="-1" />
        <FoldOut rect={rect}>
          <MenuFoldOut>
            <MenuPane>
              <List>
                {this.generateMenu(menu)}
              </List>
            </MenuPane>
          </MenuFoldOut>
        </FoldOut>
      </Wrapper>
    );
  }
}

MenuList.propTypes = {
  menu: PropTypes.array,
  rect: PropTypes.object,
};
