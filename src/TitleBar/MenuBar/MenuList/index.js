import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import SubMenu, { SubMenuLabelStyle } from './SubMenu';
import { defaultMenuItem } from '../../utils';
import css from './styles.css';
import ThemeContext from '../../Theme';

const styles = {
  Wrapper: {
    zIndex: 8,
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
    left: 0
  },
  FoldOut: {
    background: 'transparent',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0
  },
  MenuPane: {
    pointerEvents: 'all'
  },
  MenuFoldOut: {
    paddingTop: 5,
    paddingBottom: 5
  }
}

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.generateMenu = this.generateMenu.bind(this);
  }

  generateMenu(menu = []) {
    const theme = this.context;
    return menu.map((menuItem, i) => {
      if (menuItem.submenu || (menuItem.type && menuItem.type.toLowerCase() === 'submenu')) {
        const menuWidth = this.props.rect.left + theme.menuWidth;
        const windowWidth = window.innerWidth;
        let renderSide = 'right';
        let right = menuWidth + theme.menuWidth;

        // Render menu to the left if the right side of the
        // current menu is greater than the current window width
        if (right > windowWidth && theme.menuWidth < this.props.rect.left) {
          renderSide = 'left';
          right = menuWidth - theme.menuWidth;
        }

        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            level={1}
            right={right}
            renderSide={renderSide}
            changeCheckState={this.props.changeCheckState}
            menuItem={{ ...defaultMenuItem, ...menuItem, type: 'submenu' }}
            path={this.props.vertical ? [...this.props.path, i, 'submenu'] : [...this.props.path, 'submenu', i, 'submenu']}
          />
        );
      }
      return (
        <MenuItem
          key={`${i}${menuItem.label}`}
          menuItem={{ ...defaultMenuItem, ...menuItem }}
          changeCheckState={this.props.changeCheckState}
          indx={i}
          path={this.props.vertical ? [...this.props.path] : [...this.props.path, 'submenu']}
        />
      );
    });
  }

  render() {
    const {
      submenu,
      rect
    } = this.props;

    const theme = this.context;

    return (
      <div
        style={{
          ...styles.Wrapper,
          height: `calc(100% - ${rect.bottom}px)`,
          top: `${rect.bottom}px`
        }}
      >
        <div
          className={css.MenuListOverlay}
          style={{
            background: theme.menuOverlayBackground,
            opacity: theme.menuOverlayOpacity
          }}
          tabIndex="-1"
        />
        <div
          style={{
            ...styles.FoldOut,
            marginLeft: rect.left,
            maxWidth: `calc(100% - ${rect.left}px)`,
            color: theme.menuActiveTextColor
          }}
        >
          <div
            style={{
              ...styles.MenuFoldOut,
              background: theme.menuBackgroundColor,
              boxShadow: theme.showBoxShadow ? theme.menuBoxShadow : ''
            }}
          >
            <div
              style={{
                ...styles.MenuPane,
                width: theme.menuWidth
              }}
            >
              {
                (theme.menuStyle === 'vertical' && theme.menuSubLabelHeaders) &&
                  <div
                    style={{
                      ...SubMenuLabelStyle,
                      color: theme.menuSubLabelColor
                    }}
                    key="main-menu-sublabel"
                  >
                    Menu
                  </div>
              }
              {this.generateMenu(submenu)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MenuList.propTypes = {
  submenu: PropTypes.array,
  path: PropTypes.array,
  rect: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,
  changeCheckState: PropTypes.func
};

MenuList.defaultProps = {
  submenu: [],
  path: [],
  changeCheckState: () => {}
};

MenuList.contextType = ThemeContext;

export default MenuList;
