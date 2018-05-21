import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuItem from '../MenuItem';

const SubMenuWrapper = styled.div`
  position: absolute;
  top: -5px;
  left: ${props => props.renderSide === 'left' ? '-100%' : '100%'};
  max-width: 240px;
  width: 100%;
  background-color: ${props => props.menuBackgroundColor};
  padding: 5px 0px;
  color: ${props => props.menuTextColor};
  z-index: ${props => props.level + 8};
  box-shadow: ${props => props.showBoxShadow ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' : ''};
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
            label={menuItem.label}
            menu={menuItem.submenu}
            onClick={menuItem.click}
            enabled={menuItem.enabled}
            visiable={menuItem.visiable}
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
          type={menuItem.type}
          label={menuItem.label}
          onClick={menuItem.click}
          enabled={menuItem.enabled}
          visiable={menuItem.visiable}
          menuTextHighlightColor={menuTextHighlightColor}
          menuHighlightColor={menuHighlightColor}
        />
      );
    });
  }

  render() {
    const {
      menu,
      label,
      level,
      renderSide,
      menuWidth,
      showBoxShadow,
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
        label={label}
        menuTextHighlightColor={menuTextHighlightColor}
        menuHighlightColor={menuHighlightColor}
        showArrow
      >
        {
          (this.state.hovering) &&
            <SubMenuWrapper
              menuTextColor={menuTextColor}
              menuBackgroundColor={menuBackgroundColor}
              showBoxShadow={showBoxShadow}
              menuWidth={menuWidth}
              level={level}
              renderSide={renderSide}
            >
              {
                this.generateMenu(menu)
              }
            </SubMenuWrapper>
        }
      </MenuItem>
    );
  }
}

SubMenu.propTypes = {
  menu: PropTypes.array,
  label: PropTypes.string,
  level: PropTypes.number,
  renderSide: PropTypes.string,
  menuWidth: PropTypes.number,
  showBoxShadow: PropTypes.bool,
};

SubMenu.defaultProps = {
  level: 1,
  renderSide: 'right',
  menuWidth: 240,
  showBoxShadow: true,
};
