import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuItem from '../MenuItem';
import { defaultMenuItem } from '../../../utils';

const SubMenuWrapper = styled.div`
  position: absolute;
  top: ${props => props.showSubLabelHeaders ? '-25px' : '-5px'};
  left: ${props => props.renderSide === 'left' ? '-100%' : '100%'};
  max-width: 240px;
  width: 100%;
  background-color: ${props => props.menuBackgroundColor};
  padding: 5px 0px;
  color: ${props => props.menuTextColor};
  z-index: ${props => props.level + 8};
  box-shadow: ${props => props.showBoxShadow ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' : ''};
`;

const SubMenuLabel = styled.div`
  height: 20px;
  line-height: 20px;
  margin: 0 10px;
  color: #6a737d;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: rtl;
  font-size: 1em;
  text-align: left;
`;

export default class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
  }

  generateMenu = (menu = []) => {
    const {
      menuTextHighlightColor,
      menuHighlightColor,
      showBoxShadow,
      menuTextColor,
      menuBackgroundColor,
    } = this.props;
    return menu.map((menuItem, i) => {
      if (menuItem.submenu) {
        // create submenu item
        let menuWidth = this.props.right + this.props.menuWidth;
        const windowWidth = window.innerWidth;
        let renderSide = 'right';
        if ((menuWidth) > windowWidth) {
          renderSide = 'left';
          menuWidth = this.props.right - this.props.menuWidth;
        }
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            renderSide={renderSide}
            right={menuWidth}
            level={this.props.level + 1}
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
          menuTextHighlightColor={menuTextHighlightColor}
          menuHighlightColor={menuHighlightColor}
        />
      );
    });
  }

  render() {
    const {
      menuItem,
      level,
      renderSide,
      menuWidth,
      showBoxShadow,
      showSubLabelHeaders,
      menuBackgroundColor,
      menuTextHighlightColor,
      menuHighlightColor,
      menuTextColor,
    } = this.props;

    return (
      <MenuItem
        onMouseEnter={() => {
          this.setState({
            hovering: true,
          });
        }}
        onMouseLeave={() => {
          this.setState({
            hovering: false,
          });
        }}
        menuItem={{ ...defaultMenuItem, ...menuItem }}
        menuTextHighlightColor={menuTextHighlightColor}
        menuHighlightColor={menuHighlightColor}
      >
        {
          (this.state.hovering) &&
            <SubMenuWrapper
              menuTextColor={menuTextColor}
              showSubLabelHeaders={showSubLabelHeaders}
              menuBackgroundColor={menuBackgroundColor}
              showBoxShadow={showBoxShadow}
              menuWidth={menuWidth}
              level={level}
              renderSide={renderSide}
            >
              {
                showSubLabelHeaders &&
                <SubMenuLabel>{menuItem.label}</SubMenuLabel>
              }
              {
                this.generateMenu(menuItem.submenu)
              }
            </SubMenuWrapper>
        }
      </MenuItem>
    );
  }
}

SubMenu.propTypes = {
  level: PropTypes.number,
  renderSide: PropTypes.string,
  menuWidth: PropTypes.number,
  showBoxShadow: PropTypes.bool,
  menuItem: PropTypes.object,
  showSubLabelHeaders: PropTypes.bool,
};

SubMenu.defaultProps = {
  level: 1,
  renderSide: 'right',
  menuWidth: 240,
  showBoxShadow: true,
  showSubLabelHeaders: true,
};
