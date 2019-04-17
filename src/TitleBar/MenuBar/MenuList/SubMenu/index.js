import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem';
import { defaultMenuItem } from '../../../utils';
import MenuListContainer from '../MenuListContainer';

export const SubMenuLabelStyle = {
  height: '20px',
  lineHeight: '20px',
  margin: '0px 10px',
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  direction: 'rtl',
  fontSize: '1em',
  textAlign: 'left',
  cursor: 'default',
};

const styles = {
  SubMenuWrapper: {
    position: 'absolute',
  }
};

class SubMenu extends Component {
  constructor(props) {
    super(props);
    this._generateMenu = this._generateMenu.bind(this);
  }

  _generateMenu(menu = []) {
    const { theme } = this.props;
    return menu.map((menuItem, i) => {
      if (menuItem.submenu) {
        // create submenu item
        const windowWidth = window.innerWidth;
        let renderSide = 'right';
        let right = this.props.right + theme.menuMinWidth;

        // Render menu to the left if the right side of the
        // current menu is greater than the current window width
        if (right > windowWidth) {
          if (theme.menuMinWidth < (this.props.right - theme.menuMinWidth)) {
            renderSide = 'left';
            right = this.props.right - theme.menuMinWidth;
          } else {
            // check wich side has more space and zero it out to the right or left
            const rightDiff = windowWidth - right;
            const leftDiff = this.props.right - theme.menuMinWidth;
            if (rightDiff < leftDiff) {
              // zero out to the right
            }
          }
        }
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            // level={this.props.level + 1}
            // right={right}
            theme={theme}
            renderSide={renderSide}
            menuRef={this.props.menuRef}
            changeCheckState={this.props.changeCheckState}
            menuItem={{ ...defaultMenuItem, ...menuItem, type: 'submenu' }}
            path={[...this.props.path, i, 'submenu']}
          />
        );
      }

      return (
        <MenuItem
          indx={i}
          key={`${i}${menuItem.label}`}
          theme={theme}
          changeCheckState={this.props.changeCheckState}
          menuItem={{ ...defaultMenuItem, ...menuItem }}
          menuRef={this.props.menuRef}
          path={[...this.props.path]}
        />
      );
    });
  }

  render() {
    const {
      menuItem,
      // renderSide,
      theme
    } = this.props;

    return (
      <MenuItem
        rectRef={r => { this.item = r; }}
        menu={this.props.menu}
        theme={theme}
        menuItem={{ ...defaultMenuItem, ...menuItem }}
      >
        <MenuListContainer
          theme={theme}
          rect={this.item && this.item.getBoundingClientRect()}
          submenu
        >
          {
            theme.menuSubLabelHeaders &&
            <div
              style={{
                ...SubMenuLabelStyle,
                color: theme.menuSubLabelColor
              }}
            >
              {menuItem.label}
            </div>
          }
          {
            this._generateMenu(menuItem.submenu)
          }
        </MenuListContainer>
      </MenuItem>
    );
  }
}

SubMenu.propTypes = {
  menuItem: PropTypes.object,
  level: PropTypes.number,
  renderSide: PropTypes.string,
  changeCheckState: PropTypes.func
};

SubMenu.defaultProps = {
  menuItem: {},
  level: 1,
  renderSide: 'right',
  changeCheckState: () => {}
};

export default SubMenu;
