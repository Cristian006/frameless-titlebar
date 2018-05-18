import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuButton from './MenuButton';
import MenuList from './MenuList';

const Wrapper = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
  max-width: calc(100% - 163px);
  overflow: hidden;
  color: ${props => props.lightTextColor};
`;

export default class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: -1,
      focusing: -1,
      clicked: false,
    };
  }

  onMenuItemClick = (index) => {
    this.setState({
      clicked: true,
      focusing: index,
    });
  };

  generateMenu = (menuObj = []) => {
    return menuObj.map((menuItem, i) => {
      return (
        <MenuButton
          key={i}
          onMouseOver={() => this.setState({hovering: i})}
          onFocus={() => this.setState({focusing: i})}
          onClick={() => this.onMenuItemClick(i)}
          hovering={i === this.state.hovering}
          open={this.state.clicked && i === this.state.foucing}
          closed={!this.state.clicked || i !== this.state.focusing}
          label={menuItem.label}
        >
          {
            this.state.clicked && i === this.state.focusing &&
            <MenuList
              rect={this.menuItems[i].getBoundingClientRect()}
              menuList={menuItem.submenu}
              changeCheckState={this.changeCheckState}
              mainIndex={i}
            />
          }
        </MenuButton>
      );
    });
  };

  render() {
    const {
      menu,
      lightTextColor
    } = this.props;

    return (
      <Wrapper
        role="menubar"
        aria-label="App MenuBar"
        lightTextColor={lightTextColor}
      >
        {
          this.generateMenu(menu)
        }
      </Wrapper>
    );
  }
}

MenuBar.propTypes = {
  menu: PropTypes.array,
  lightTextColor: PropTypes.string,
};

MenuBar.defaultProps = {
  menu: [],
  lightTextColor: '#6a737d',
};
