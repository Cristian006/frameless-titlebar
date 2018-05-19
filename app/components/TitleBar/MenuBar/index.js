import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuButton from './MenuButton';
import MenuList from './MenuList';

const Wrapper = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
  max-width: calc(100% - 163px);
  color: ${props => props.color};
`;

export default class MenuBar extends Component {
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
  }

  // lock set to true to keep menu panes open
  onTouchStart = (i) => {
    if (i !== this.state.focusing && this.state.clicked) {
      this.lock = true;
    }
  }

  // if moving over a different menu button - select that menu button
  onMouseMove = (i) => {
    if (i === this.state.focusing) return;
    this.setState({
      focusing: i,
    });
  }

  // when a menu button is clicked
  onMenuButtonClick = (index) => {
    if (this.lock) {
      this.lock = false;
      return;
    }
    console.log('clicked');
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
            this.setState({
              hovering: i,
            });
          }}
          onMouseLeave={() => {
            this.setState({
              hovering: -1,
            });
          }}
          onMouseOver={() => {
            this.onMenuButtonMouseOver(i);
          }}
          onMouseMove={() => {
            this.onMouseMove(i);
          }}
          onTouchStart={() => {
            this.onTouchStart(i);
          }}
          onClick={() => {
            this.onMenuButtonClick(i);
          }}
          onFocus={() => {
            // idk - linting says it needs it? it has no purpose for me
          }}
          rectRef={(ref) => this.setMenuRef(ref, i)}
          hovering={i === this.state.hovering}
          open={this.state.clicked && i === this.state.focusing}
          closed={!this.state.clicked || i !== this.state.focusing}
          label={menuItem.label}
        >
          {
            (this.state.clicked && i === this.state.focusing) &&
            <MenuList
              rect={this.menuItems[i].getBoundingClientRect()}
              menu={menuItem.submenu}
              mainIndex={i}
            />
          }
        </MenuButton>
      );
    });
  };

  render() {
    const {
      defaultTextColor
    } = this.props;

    return (
      <Wrapper
        role="menubar"
        aria-label="App MenuBar"
        color={defaultTextColor}
      >
        {
          this.generateMenu(this.state.menu)
        }
      </Wrapper>
    );
  }
}

MenuBar.propTypes = {
  menu: PropTypes.array,
  defaultTextColor: PropTypes.string,
  hoverTextColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
};

MenuBar.defaultProps = {
  menu: [],
  defaultTextColor: '#6a737d',
  hoverTextColor: '#BDBDBD',
  hoverBackgroundColor: '#BDBDBD',
};
