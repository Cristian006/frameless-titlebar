import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuItem from '../MenuItem';

const SubMenuWrapper = styled.div`
  position: absolute;
  top: -5px;
  left: 100%;
  max-width: 240px;
  width: 100%;
  background-color: white;
  padding: 5px 0px;
  border-left: 1px solid #eee;
`;

export default class SubMenu extends Component {
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
      label
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
        showArrow
      >
        {
          (this.state.hovering) &&
            <SubMenuWrapper>
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
};
