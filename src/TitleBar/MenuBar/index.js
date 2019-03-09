import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton';
import MenuList from './MenuList';
import { reduxSet, getProperty } from '../utils';
import { buildMenu, getMenuItemPathById } from './utils';

const menuIcon = (
  <svg version="1.1" width="24px" height="24px" viewBox="0 0 32 32">
    <path d="M 4 7 L 4 9 L 28 9 L 28 7 Z M 4 15 L 4 17 L 28 17 L 28 15 Z M 4 23 L 4 25 L 28 25 L 28 23 Z "/>
  </svg>
);

const styles = {
  Wrapper: {
    display: 'flex',
    WebkitAppRegion: 'no-drag',
    maxWidth: 'calc(100% - 163px)'
  }
};

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: -1,
      focusing: 0,
      clicked: false,
      menu: buildMenu(props.menu)
    };

    this._onMenuButtonMouseOver = this._onMenuButtonMouseOver.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMenuButtonClick = this._onMenuButtonClick.bind(this);
    this._setMenuRef = this._setMenuRef.bind(this);
    this._changeCheckState = this._changeCheckState.bind(this);
    this._generateHorizontalMenu = this._generateHorizontalMenu.bind(this);
    this._generateVerticalMenu = this._generateVerticalMenu.bind(this);
    this._setKeyByPath = this._setKeyByPath.bind(this);
    this._getKeyByPath = this._getKeyByPath.bind(this);
    this.setKeyById = this.setKeyById.bind(this);
    this.getKeyById = this.getKeyById.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menu !== this.state.menu) {
      this.setState({
        menu: buildMenu(nextProps.menu)
      });
    }
  }

  setKeyById(id, key, val) {
    // get path to id
    let path = getMenuItemPathById(this.state.menu, id);
    if (path.length > 0) {
      this._setKeyByPath(path, key, val);
    }
  }

  getKeyById(id, key) {
    let path = getMenuItemPathById(this.state.menu, id);
    if (path.length > 0) {
      return this._getKeyByPath([...path], key);
    }
  }

  // if hovering over another button while menu is clicked; change focus
  _onMenuButtonMouseOver(i) {
    if (this.state.clicked) {
      this.setState({
        focusing: i
      });
    }
  }

  // lock set to true to keep menu panes open
  _onTouchStart(i) {
    if (i !== this.state.focusing && this.state.clicked) {
      this.lock = true;
    }
  }

  // if moving over a different menu button - select that menu button
  _onMouseMove(i) {
    if (i === this.state.focusing) return;
    this.setState({
      focusing: i
    });
  }

  // when a menu button is clicked
  _onMenuButtonClick(index) {
    if (this.lock) {
      this.lock = false;
      return;
    }
    this.setState({
      clicked: !(this.state.focusing === index && this.state.clicked),
      hovering: !(this.state.focusing === index && this.state.clicked) ? this.state.hovering : -1
    });
  }

  // we need the rect's bounds for the child menu pane
  _setMenuRef(ref, i) {
    if (this.menuItems) {
      this.menuItems[i] = ref;
    } else {
      this.menuItems = { [i]: ref };
    }
  }

  // path: to current submenu
  // checked: new state
  _changeCheckState(path, itemIndx, checked, isRadio = false) {
    if (!isRadio) {
      this._setKeyByPath([...path, itemIndx], 'checked', checked);
    } else {
      let newState = { ...this.state };
      getProperty(path, this.state).forEach((menuItem, indx) => {
        if (menuItem.type === 'radio') {
          newState = reduxSet(newState, [...path, indx, 'checked'], indx === itemIndx);
        }
      });
      this.setState(newState);
    }
  }

  _setKeyByPath(path, key, val) {
    this.setState(reduxSet(this.state, [...path, key], val));
  }

  _getKeyByPath(path, key) {
    // if key is undefined -> the getKeyById will just return the menu item
    return getProperty(key ? [...path, key] : [...path], this.state);
  }

  _generateHorizontalMenu(menuObj = []) {
    return menuObj.map((menuItem, i) => {
      return (
        <MenuButton
          key={`${menuItem.label}`}
          onMouseEnter={() => {
            if (menuItem.enabled === false) return;
            this.setState({
              hovering: i
            });
          }}
          onMouseLeave={() => {
            if (menuItem.enabled === false) return;
            this.setState({
              hovering: -1
            });
          }}
          onMouseOver={() => {
            if (menuItem.enabled === false) return;
            this._onMenuButtonMouseOver(i);
          }}
          onMouseMove={() => {
            if (menuItem.enabled === false) return;
            this._onMouseMove(i);
          }}
          onTouchStart={() => {
            if (menuItem.enabled === false) return;
            this._onTouchStart(i);
          }}
          onClick={() => {
            if (menuItem.enabled === false) return;
            this._onMenuButtonClick(i);
          }}
          onFocus={() => {
            // idk - linting says it needs it? it has no purpose for me
          }}
          rectRef={(ref) => this._setMenuRef(ref, i)}
          hovering={i === this.state.hovering}
          open={this.state.clicked && i === this.state.focusing}
          closed={!this.state.clicked || i !== this.state.focusing}
          enabled={menuItem.enabled}
          label={menuItem.label}
          theme={this.props.theme}
        >
          {
            (this.state.clicked && i === this.state.focusing) &&
              <MenuList
                menuRef={this}
                changeCheckState={this._changeCheckState}
                theme={this.props.theme}
                rect={this.menuItems[i].getBoundingClientRect()}
                submenu={menuItem.submenu}
                mainIndex={i}
                path={['menu', i]}
              />
          }
        </MenuButton>
      );
    });
  }

  _generateVerticalMenu(menuList = []) {
    return (
      <MenuButton
        onMouseEnter={() => {
          this.setState({
            hovering: 0,
          });
        }}
        onMouseLeave={() => {
          this.setState({
            hovering: -1,
          });
        }}
        onMouseOver={() => {
          this._onMenuButtonMouseOver(0);
        }}
        onMouseMove={() => {
          this._onMouseMove(0);
        }}
        onTouchStart={() => {
          this._onTouchStart(0);
        }}
        onClick={() => {
          this._onMenuButtonClick(0);
        }}
        onFocus={() => {
          // idk - linting says it needs it? it has no purpose for me
        }}
        theme={this.props.theme}
        rectRef={(ref) => this._setMenuRef(ref, 0)}
        hovering={this.state.hovering === 0}
        open={this.state.clicked && this.state.focusing === 0}
        closed={!this.state.clicked || this.state.focusing !== 0}
        label={menuIcon}
        enabled
      >
        {
          (this.state.clicked && this.state.focusing === 0) &&
            <MenuList
              menuRef={this}
              changeCheckState={this._changeCheckState}
              rect={this.menuItems[0].getBoundingClientRect()}
              theme={this.props.theme}
              submenu={menuList}
              path={['menu']}
              vertical
            />
        }
      </MenuButton>
    );
  }

  render() {
    let { theme } = this.props;
    let color = theme.menuItemTextColor || theme.barColor;
    return (
      <div style={{ ...styles.Wrapper, color }}>
        {
          (theme.menuStyle === 'vertical')
            ? this._generateVerticalMenu(this.state.menu)
            : this._generateHorizontalMenu(this.state.menu)
        }
      </div>
    );
  }
}

MenuBar.propTypes = {
  menu: PropTypes.array
};

MenuBar.defaultProps = {
  menu: []
};

export default MenuBar;
