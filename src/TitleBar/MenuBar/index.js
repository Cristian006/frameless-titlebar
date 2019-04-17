import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton';
import MenuList from './MenuList';
import { reduxSet, getProperty, debounce } from '../utils';
import { buildMenu, getMenuItemPathById } from './utils';
import { MenuIcon } from '../utils/icons';

const styles = {
  Wrapper: {
    height: '100%',
    display: 'flex',
    WebkitAppRegion: 'no-drag',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    boxSizing: 'border-box'
  }
};

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: -1,
      focusing: 0,
      clicked: false,
      menu: buildMenu(props.menu),
      overflowMenu: [],
      overflowIndex: props.menu.length || 0,
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
    this.numMenusShown = 0;
    this.menuItems = [];
    this.resizeDebounce = debounce(this.updateMenu, 16);
  }

  componentDidMount() {
    this.updateMenu();
    window.addEventListener('resize', this.resizeDebounce);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.resizeDebounce);
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

  get menuBarWidth() {
    return this.menuBar.clientWidth;
  }

  get menuBarHeight() {
		return this.menuBar.clientHeight;
  }

  get hasOverflow() {
    return this.numMenusShown < this.menuItems.length;
  }

	get getWidth() {
		if (this.menuItems) {
			const left = this.menuItems[0].buttonElement.getBoundingClientRect().left;
			const right = this.hasOverflow ? this.overflowMenu.buttonElement.getBoundingClientRect().right : this.menuItems[this.menuItems.length - 1].getBoundingClientRect().right;
			return right - left;
    }
    
		return 0;
  }
  
  get getOverflowIndex() {
    return this.hasOverflow ? this.overflowIndex : this.menuItems.length - 1;
  }

  updateMenu = () => {
    requestAnimationFrame(() => {
      if (!this.menuItems || !this.menuItems.length) {
        return;
      }

      const availableSize = this.menuBar.offsetWidth;
      let currentSize = 0;
      let full = false;
      const prevNumMenusShown = this.numMenusShown;
      this.numMenusShown = 0;

      this.menuItems.forEach((menuItem) => {
        if (!full) {
          const size = menuItem.offsetWidth;
          if (currentSize + size > availableSize) {
            full = true;
          } else {
            currentSize += size;
            this.numMenusShown += 1;
            if (this.numMenusShown > prevNumMenusShown) {
              // show previously hidden overflown element
              menuItem.style.visibility = 'visible';
            }
          }
          if (full) {
            // hide overflown item
            menuItem.style.visibility = 'hidden';
          }
        }
      });

      // we have overflow
      if (full) {
        // remove buttons until we can fit the more button
        while(currentSize + this.overflowButtonRef.offsetWidth > availableSize && this.numMenusShown > 0) {
            this.numMenusShown -= 1;
            const size = this.menuItems[this.numMenusShown].offsetWidth;
            this.menuItems[this.numMenusShown].style.visibility = 'hidden';
            currentSize -= size;
        }
  
        // update overflow menu
        this.setState({
          overflowMenu: [...this.state.menu.slice(this.numMenusShown, this.state.menu.length)],
          overflowIndex: this.numMenusShown,
        });
      } else {
        this.setState({
          overflowMenu: [],
          overflowIndex: this.menuItems.length
        })
      }
    });
  }

  _generateHorizontalMenu(menuObj = []) {
    const { overflowIndex, overflowMenu } = this.state;
    const menuList = menuObj.map((menuItem, i) => {
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
                parentRef={this.menuItems[i]}
                submenu={menuItem.submenu}
                mainIndex={i}
                path={['menu', i]}
              />
          }
        </MenuButton>
      );
    });

    // insert overflow button if needed
    menuList.splice(overflowIndex, 0, (
      <MenuButton
        key="more"
        label="..."
        onMouseEnter={() => {
          this.setState({
            hovering: overflowIndex
          });
        }}
        onMouseLeave={() => {
          this.setState({
            hovering: -1
          });
        }}
        onMouseOver={() => {
          this._onMenuButtonMouseOver(overflowIndex);
        }}
        onMouseMove={() => {
          this._onMouseMove(overflowIndex);
        }}
        onTouchStart={() => {
          this._onTouchStart(overflowIndex);
        }}
        onClick={() => {
          this._onMenuButtonClick(overflowIndex);
        }}
        rectRef={(ref) => this.overflowButtonRef = ref}
        hovering={overflowIndex === this.state.hovering}
        open={this.state.clicked && overflowIndex === this.state.focusing}
        closed={!this.state.clicked || overflowIndex !== this.state.focusing}
        style={{visibility: this.hasOverflow ? 'visible' : 'hidden'}}
        theme={this.props.theme}
      >
        {
          (this.state.clicked && overflowIndex === this.state.focusing) &&
            <MenuList
              menuRef={this}
              changeCheckState={this._changeCheckState}
              parentRef={this.overflowButtonRef}
              submenu={overflowMenu}
              theme={this.props.theme}
              path={['menu']}
              vertical
            />
        }
      </MenuButton>
    ));

    return menuList;
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
        label={<MenuIcon />}
        enabled
      >
        {
          (this.state.clicked && this.state.focusing === 0) &&
            <MenuList
              menuRef={this}
              changeCheckState={this._changeCheckState}
              parentRef={this.menuItems[0]}
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
    let { theme, inActive } = this.props;
    let color = theme.menuItemTextColor || theme.barColor;
    let opacity = inActive ? theme.inActiveOpacity : 1;
    return (
      <div
        ref={r => this.menuBar = r}
        style={{ ...styles.Wrapper, color, opacity }}
        role="menubar"
      >
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
  menu: PropTypes.array,
  inActive: PropTypes.bool
};

MenuBar.defaultProps = {
  menu: []
};

export default MenuBar;
