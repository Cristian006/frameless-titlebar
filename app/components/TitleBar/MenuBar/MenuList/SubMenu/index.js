import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import MenuItem from '../MenuItem';
import { defaultMenuItem } from '../../../utils';

const SubMenuWrapper = styled.div`
  position: absolute;
  top: ${props => props.theme.menuSubLabelHeaders ? '-25px' : '-5px'};
  left: ${props => props.renderSide === 'left' ? '-100%' : '100%'};
  max-width: ${props => props.theme.menuWidth};
  width: 100%;
  background-color: ${props => props.theme.menuBackgroundColor};
  padding: 5px 0px;
  color: ${props => props.theme.menuActiveTextColor};
  z-index: ${props => props.level + 8};
  box-shadow: ${props => props.theme.menuShowBoxShadow ? props.theme.menuBoxShadow : ''};
`;

const SubMenuLabel = styled.div`
  height: 20px;
  line-height: 20px;
  margin: 0 10px;
  color: ${props => props.theme.menuSubLabelColor};
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: rtl;
  font-size: 1em;
  text-align: left;
`;

class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
  }

  generateMenu = (menu = []) => {
    return menu.map((menuItem, i) => {
      if (menuItem.submenu) {
        // create submenu item
        let menuWidth = this.props.right + this.props.theme.menuWidth;
        const windowWidth = window.innerWidth;
        let renderSide = 'right';
        if ((menuWidth) > windowWidth) {
          renderSide = 'left';
          menuWidth = this.props.right - this.props.theme.menuWidth;
        }
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            renderSide={renderSide}
            right={menuWidth}
            level={this.props.level + 1}
            theme={this.props.theme}
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
      menuItem,
      level,
      renderSide,
      theme,
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
      >
        {
          (this.state.hovering) &&
            <SubMenuWrapper
              level={level}
              renderSide={renderSide}
            >
              {
                theme.menuSubLabelHeaders &&
                <SubMenuLabel>
                  {menuItem.label}
                </SubMenuLabel>
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
};

SubMenu.defaultProps = {
  level: 1,
  renderSide: 'right',
};

export default withTheme(SubMenu);
