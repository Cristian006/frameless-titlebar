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
  margin-left: ${props => props.rect.left}px;
  max-width: calc(100% - ${props => props.rect.left}px);
  top: 0;
  color: #24292e;
`;

const MenuFoldOut = styled.div`
  background: #fff;
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const MenuPane = styled.div`
  pointer-events: all;
  width: 240px;
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
  generateMenu = (menu = []) => {
    return menu.map((menuItem, i) => {
      if (menuItem.submenu) {
        const menuWidth = this.props.rect.left + 240;
        const windowWidth = window.innerWidth;
        let renderSide = 'right';
        let right = menuWidth + 240;
        if (right > windowWidth) {
          renderSide = 'left';
          right = menuWidth - 240;
        }
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            level={1}
            right={right}
            renderSide={renderSide}
            label={menuItem.label}
            menu={menuItem.submenu}
          />
        );
      }
      return (
        <MenuItem
          key={`${i}${menuItem.label}`}
          type={menuItem.type}
          label={menuItem.label}
          onClick={menuItem.click}
          enabled={menuItem.enabled}
          visiable={menuItem.visiable}
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
              {this.generateMenu(menu)}
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
