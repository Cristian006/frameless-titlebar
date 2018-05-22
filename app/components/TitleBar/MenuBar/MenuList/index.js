import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import { defaultMenuItem } from '../../utils';

const Wrapper = styled.div`
  z-index: 8;
  position: absolute;
  width: 100%;
  height: calc(100% - ${props => props.rect.bottom}px);
  top: ${props => props.rect.bottom}px;
  overflow: hidden;
  left: 0;
`;

const FoldOut = styled.div`
  background: transparent;
  pointer-events: none;
  position: absolute;
  margin-left: ${props => props.rect.left}px;
  max-width: calc(100% - ${props => props.rect.left}px);
  top: 0;
  color: ${props => props.theme.menuActiveTextColor};
`;

const MenuFoldOut = styled.div`
  background: ${props => props.theme.menuBackgroundColor};
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: ${props => props.theme.showBoxShadow ? props.theme.menuBoxShadow : ''};
`;

const MenuPane = styled.div`
  pointer-events: all;
  width: ${props => props.theme.menuWidth}px;
`;

const Overlay = styled.div`
  background: ${props => props.theme.menuOverlayBackground};
  opacity: ${props => props.theme.menuOverlayOpacity};
  height: 100%;
  overflow: hidden;
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

class MenuList extends Component {
  generateMenu = (menu = []) => {
    return menu.map((menuItem, i) => {
      if (menuItem.submenu || (menuItem.type && menuItem.type.toLowerCase() === 'submenu')) {
        const menuWidth = this.props.rect.left + this.props.theme.menuWidth;
        const windowWidth = window.innerWidth;
        let renderSide = 'right';
        let right = menuWidth + this.props.theme.menuWidth;

        // Render menu to the left if the right side of the
        // current menu is greater than the current window width
        if (right > windowWidth && this.props.theme.menuWidth < this.props.rect.left) {
          renderSide = 'left';
          right = menuWidth - this.props.theme.menuWidth;
        }

        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            level={1}
            right={right}
            renderSide={renderSide}
            menuItem={{ ...defaultMenuItem, ...menuItem, type: 'submenu' }}
          />
        );
      }
      return (
        <MenuItem
          key={`${i}${menuItem.label}`}
          menuItem={{ ...defaultMenuItem, ...menuItem }}
        />
      );
    });
  }

  render() {
    const {
      submenu,
      rect
    } = this.props;

    return (
      <Wrapper rect={rect}>
        <Overlay tabIndex="-1" />
        <FoldOut rect={rect}>
          <MenuFoldOut>
            <MenuPane>
              {this.generateMenu(submenu)}
            </MenuPane>
          </MenuFoldOut>
        </FoldOut>
      </Wrapper>
    );
  }
}

MenuList.propTypes = {
  submenu: PropTypes.array,
  rect: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,
};

MenuList.defaultProps = {
  submenu: [],
};

export default withTheme(MenuList);
