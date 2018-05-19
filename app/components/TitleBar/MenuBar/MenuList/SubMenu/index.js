import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuItem from '../MenuItem';

const SubMenuWrapper = styled.div`
  position: absolute;
  top: -5px;
  left: ${props => props.renderSide === 'left' ? '-100%' : '100%'}
  max-width: 240px;
  width: 100%;
  background-color: white;
  padding: 5px 0px;
  border-left: 1px solid #eee;
  z-index: ${props => props.level + 8}
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
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
        let menuWidth = this.props.right + 240;
        const windowWidth = window.innerWidth;
        let renderSide = 'right';
        if ((menuWidth) > windowWidth) {
          renderSide = 'left';
          menuWidth = this.props.right - 240;
        }
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            renderSide={renderSide}
            right={menuWidth}
            level={this.props.level + 1}
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
      label,
      level,
      renderSide,
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
            <SubMenuWrapper
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
};

SubMenu.defaultProps = {
  level: 1,
  renderSide: 'right',
}
