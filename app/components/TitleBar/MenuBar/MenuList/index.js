import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import { defaultMenuItem } from '../../utils';

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
  color: ${props => props.color};
`;

const MenuFoldOut = styled.div`
  background: ${props => props.menuBackgroundColor};
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: ${props => props.showBoxShadow ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' : ''};
`;

const MenuPane = styled.div`
  pointer-events: all;
  width: ${props => props.menuWidth}px;
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
    const {
      menuBackgroundColor,
      menuTextHighlightColor,
      menuHighlightColor,
      showBoxShadow,
      menuTextColor,
    } = this.props;
    return menu.map((menuItem, i) => {
      if (menuItem.submenu || (menuItem.type && menuItem.type.toLowerCase() === 'submenu')) {
        const menuWidth = this.props.rect.left + this.props.menuWidth;
        const windowWidth = window.innerWidth;
        let renderSide = 'right';
        let right = menuWidth + this.props.menuWidth;
        if (right > windowWidth) {
          renderSide = 'left';
          right = menuWidth - this.props.menuWidth;
        }
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            level={1}
            menuWidth={this.props.menuWidth}
            right={right}
            renderSide={renderSide}
            menuItem={{ ...defaultMenuItem, ...menuItem, type: 'submenu' }}
            showBoxShadow={showBoxShadow}
            menuTextColor={menuTextColor}
            menuBackgroundColor={menuBackgroundColor}
            menuTextHighlightColor={menuTextHighlightColor}
            menuHighlightColor={menuHighlightColor}
          />
        );
      }
      return (
        <MenuItem
          key={`${i}${menuItem.label}`}
          menuItem={{ ...defaultMenuItem, ...menuItem }}
          menuTextColor={menuTextColor}
          menuTextHighlightColor={menuTextHighlightColor}
          menuHighlightColor={menuHighlightColor}
        />
      );
    });
  }

  render() {
    const {
      menu,
      rect,
      menuTextColor,
      menuBackgroundColor,
      showBoxShadow,
      menuWidth,
    } = this.props;

    return (
      <Wrapper rect={rect}>
        <Overlay tabIndex="-1" />
        <FoldOut
          color={menuTextColor}
          rect={rect}
        >
          <MenuFoldOut
            showBoxShadow={showBoxShadow}
            menuBackgroundColor={menuBackgroundColor}
          >
            <MenuPane
              menuWidth={menuWidth}
            >
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
  showBoxShadow: PropTypes.bool,
  menuBackgroundColor: PropTypes.string,
  menuTextColor: PropTypes.string,
  menuTextHighlightColor: PropTypes.string,
  menuHighlightColor: PropTypes.string,
  menuWidth: PropTypes.number,
};

MenuList.defaultProps = {
  menuBackgroundColor: '#fff',
  menuTextColor: '#24292e',
  menuTextHighlightColor: '#fff',
  menuHighlightColor: '#0372ef',
  showBoxShadow: true,
  menuWidth: 240,
};
