import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem';
import { defaultMenuItem } from '../../../utils';
import ThemeContext from '../../../Theme';

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
  textAlign: 'left'
};

const styles = {
  SubMenuWrapper: {
    position: 'absolute',
    width: '100%',
    padding: '5px 0px'
  }
};

class SubMenu extends Component {
  constructor(props) {
    super(props);
    this._generateMenu = this._generateMenu.bind(this);
  }

  _generateMenu(menu = []) {
    const theme = this.context;
    return menu.map((menuItem, i) => {
      if (menuItem.submenu) {
        // create submenu item
        const windowWidth = window.innerWidth;
        let renderSide = 'right';
        let right = this.props.right + theme.menuWidth;

        // Render menu to the left if the right side of the
        // current menu is greater than the current window width
        if (right > windowWidth) {
          if (theme.menuWidth < (this.props.right - theme.menuWidth)) {
            renderSide = 'left';
            right = this.props.right - theme.menuWidth;
          } else {
            // check wich side has more space and zero it out to the right or left
            const rightDiff = windowWidth - right;
            const leftDiff = this.props.right - theme.menuWidth;
            if (rightDiff < leftDiff) {
              // zero out to the right
            }
          }
        }
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            level={this.props.level + 1}
            right={right}
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
          key={`${i}${menuItem.label}`}
          changeCheckState={this.props.changeCheckState}
          menuItem={{ ...defaultMenuItem, ...menuItem }}
          indx={i}
          menuRef={this.props.menuRef}
          path={[...this.props.path]}
        />
      );
    });
  }

  render() {
    const {
      menuItem,
      level,
      renderSide
    } = this.props;

    const theme = this.context;

    return (
      <MenuItem
        menu={this.props.menu}
        menuItem={{ ...defaultMenuItem, ...menuItem }}
      >
        <div
          style={{
            ...styles.SubMenuWrapper,
            top: theme.menuSubLabelHeaders ? '-25px' : '-5px',
            left: renderSide === 'left' ? '-100%' : '100%',
            maxWidth: theme.menuWidth,
            backgroundColor: theme.menuBackgroundColor,
            color: theme.menuActiveTextColor,
            zIndex: level + 8,
            boxShadow: theme.menuShowBoxShadow ? theme.menuBoxShadow : ''
          }}
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
        </div>
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

SubMenu.contextType = ThemeContext;

export default SubMenu;
