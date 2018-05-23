import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import MenuButton from './MenuButton';
import MenuList from './MenuList';

const menuIcon = (
  <svg version="1.1" width="24px" height="24px" viewBox="0 0 24 24">
    <g id="Rounded">
      <path d="M4,18h16c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v0C3,17.55,3.45,18,4,18z M4,13h16c0.55,0,1-0.45,1-1
      v0c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v0C3,12.55,3.45,13,4,13z M3,7L3,7c0,0.55,0.45,1,1,1h16c0.55,0,1-0.45,1-1v0
      c0-0.55-0.45-1-1-1H4C3.45,6,3,6.45,3,7z"
      />
    </g>
  </svg>
);

const Wrapper = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
  max-width: calc(100% - 163px);
  color: ${props => props.theme.menuItemTextColor || props.theme.barColor};
`;

const MenuButtonWrapper = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Button = styled.button`
  -webkit-app-region: no-drag;
  display: inline-block;
  position: relative;
  width: 45px;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: none;
  box-shadow: none;
  border-radius: 0;
  color: ${props => props.theme.menuItemTextColor};
  background-color: transparent;
  transition: background-color 0.25s ease;
  opacity: 0.5;
  & svg {
    fill: currentColor;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${props => props.theme.menuItemHoverBackground};
    opacity: 1;
  }
  &:hover:active {
    background-color: ${props => props.theme.menuItemHoverBackground};
    transition: none;
    opacity: 1;
  }
`;

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: -1,
      focusing: 0,
      clicked: false,
      menu: props.menu,
    };
  }

  // if hovering over another button while menu is clicked; change focus
  onMenuButtonMouseOver = (i) => {
    if (this.state.clicked) {
      this.setState({
        focusing: i
      });
    }
  };

  // lock set to true to keep menu panes open
  onTouchStart = (i) => {
    if (i !== this.state.focusing && this.state.clicked) {
      this.lock = true;
    }
  };

  // if moving over a different menu button - select that menu button
  onMouseMove = (i) => {
    if (i === this.state.focusing) return;
    this.setState({
      focusing: i,
    });
  };

  // when a menu button is clicked
  onMenuButtonClick = (index) => {
    if (this.lock) {
      this.lock = false;
      return;
    }
    this.setState({
      clicked: !(this.state.focusing === index && this.state.clicked),
      hovering: !(this.state.focusing === index && this.state.clicked) ? this.state.hovering : -1,
    });
  };

  // we need the rect's bounds for the child menu pane
  setMenuRef = (ref, i) => {
    if (this.menuItems) {
      this.menuItems[i] = ref;
    } else {
      this.menuItems = { [i]: ref };
    }
  };

  generateMenu = (menuObj = []) => {
    return menuObj.map((menuItem, i) => {
      return (
        <MenuButton
          key={`${menuItem.label}`}
          onMouseEnter={() => {
            if (menuItem.enabled === false) return;
            this.setState({
              hovering: i,
            });
          }}
          onMouseLeave={() => {
            if (menuItem.enabled === false) return;
            this.setState({
              hovering: -1,
            });
          }}
          onMouseOver={() => {
            if (menuItem.enabled === false) return;
            this.onMenuButtonMouseOver(i);
          }}
          onMouseMove={() => {
            if (menuItem.enabled === false) return;
            this.onMouseMove(i);
          }}
          onTouchStart={() => {
            if (menuItem.enabled === false) return;
            this.onTouchStart(i);
          }}
          onClick={() => {
            if (menuItem.enabled === false) return;
            this.onMenuButtonClick(i);
          }}
          onFocus={() => {
            // idk - linting says it needs it? it has no purpose for me
          }}
          rectRef={(ref) => this.setMenuRef(ref, i)}
          hovering={i === this.state.hovering}
          open={this.state.clicked && i === this.state.focusing}
          closed={!this.state.clicked || i !== this.state.focusing}
          enabled={menuItem.enabled}
          label={menuItem.label}
        >
          {
            (this.state.clicked && i === this.state.focusing) &&
              <MenuList
                rect={this.menuItems[i].getBoundingClientRect()}
                submenu={menuItem.submenu}
                mainIndex={i}
              />
          }
        </MenuButton>
      );
    });
  };

  render() {
    if (this.props.theme.menuStyle === 'horizontal') {
      return (
        <Wrapper>
          {
            this.generateMenu(this.state.menu)
          }
        </Wrapper>
      );
    }
    return (
      <MenuButtonWrapper>
        <Button>
          {menuIcon}
        </Button>
      </MenuButtonWrapper>
    );
  }
}

MenuBar.propTypes = {
  menu: PropTypes.array,
};

MenuBar.defaultProps = {
  menu: [],
};

export default withTheme(MenuBar);
