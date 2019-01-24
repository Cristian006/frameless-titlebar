import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import css from './styles.css';
import ThemeContext from '../../../Theme';

const checked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z" /></svg>;
const unchecked = <span />;
const radioUnchecked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" /></svg>;
const radioChecked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" /></svg>;
const arrow = <svg version="1.1" width="24px" height="24px"><g id="Rounded"><path d="M9.29,6.71L9.29,6.71c-0.39,0.39-0.39,1.02,0,1.41L13.17,12l-3.88,3.88c-0.39,0.39-0.39,1.02,0,1.41l0,0c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59c0.39-0.39,0.39-1.02,0-1.41l-4.59-4.59C10.32,6.32,9.68,6.32,9.29,6.71z" /></g></svg>;

const styles = {
  Wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    fontSize: 12,
    padding: '0px 10px',
    height: 30,
    color: 'inherit',
    cursor: 'default'
  },
  Label: {
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  Accelerator: {
    flexShrink: 0,
    marginRight: 10
  },
  Separator: {
    display: 'block',
    width: '100%',
    border: 'none',
    height: 1
  },
  Icon: {
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'center'
  }
}

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false
    };
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleMouseEnter(e) {
    const {
      menuItem
    } = this.props;

    if (menuItem.enabled === false) {
      e.stopPropagation();
      return;
    }

    this.setState({
      hovering: true
    });
  }

  _handleMouseLeave(e) {
    const {
      menuItem
    } = this.props;

    if (menuItem.enabled === false) {
      e.stopPropagation();
      return;
    }

    this.setState({
      hovering: false
    });
  }

  _handleClick(e) {
    const {
      menuItem,
      changeCheckState,
      path,
      indx
    } = this.props;

    if (menuItem.enabled === false) {
      e.stopPropagation();
      return;
    }

    switch (menuItem.type) {
      case 'checkbox': {
        e.persist();
        const newMenuItem = {
          ...menuItem,
          checked: !menuItem.checked
        };
        menuItem.click(newMenuItem, remote.getCurrentWindow(), { ...e, menuBar: this.props.menuRef });
        // TODO: Change Checked State
        changeCheckState(path, indx, !menuItem.checked);
        break;
      }
      case 'radio': {
        // e.persist();
        const newMenuItem = {
          ...menuItem,
          checked: true
        };
        menuItem.click(newMenuItem, remote.getCurrentWindow(), { ...e, menuBar: this.props.menuRef });
        if (!menuItem.checked) {
          // TODO: Change Checked State
          changeCheckState(path, indx, true, true);
        }
        break;
      }
      default:
        e.persist();
        menuItem.click(this.props.menuItem, remote.getCurrentWindow(), { ...e, menuBar: this.props.menuRef });
        break;
    }
  }

  render() {
    const {
      children,
      menuItem
    } = this.props;

    const {
      hovering
    } = this.state;

    const theme = this.context;

    const isSubMenu = (menuItem.type && menuItem.type.toLowerCase() === 'submenu');

    if (menuItem.visible === false) {
      return null;
    }

    if (menuItem.type && (menuItem.type.toLowerCase() === 'separator')) {
      return (
        <hr
          style={{
            ...styles.Separator,
            borderBottom: `1px solid ${theme.menuSeparatorColor}`
          }}
        />
      );
    }

    let statusIcon = <span />;

    if (menuItem.type === 'radio') {
      statusIcon = menuItem.checked ? radioChecked : radioUnchecked;
    } else if (menuItem.type === 'checkbox') {
      statusIcon = menuItem.checked ? checked : unchecked;
    } else if (menuItem.icon) {
      statusIcon = (
        <div
          style={{
            ...styles.Icon,
            backgroundImage: `url(${menuItem.icon})`
          }}
        />
      );
    }

    return (
      <div
        style={{
          ...styles.Wrapper,
          color: hovering ? theme.menuTextHighlightColor : '',
          opacity: menuItem.enabled ? '1' : '0.3',
          backgroundColor: hovering ? theme.menuHighlightColor : ''
        }}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onClick={this._handleClick}
      >
        <div
          className={css.StatusIcon}
          style={{
            color: hovering ? theme.menuTextHighlightColor : (theme.accentStatusIcon ? theme.menuHighlightColor : theme.menuActiveTextColor)
          }}
        >
          {statusIcon}
        </div>
        <span style={styles.Label}>
          {menuItem.label}
        </span>
        <span
          style={{
            ...styles.Accelerator,
            color: hovering ? theme.menuTextHighlightColor : theme.menuAcceleratorColor
          }}
        >
          {menuItem.accelerator}
        </span>
        {
          (isSubMenu) &&
          <div
            className={css.SubMenuArrow}
          >
            {arrow}
          </div>
        }
        {(isSubMenu && this.state.hovering) && children}
      </div>
    );
  }
}

MenuItem.propTypes = {
  menuItem: PropTypes.shape({
    label: PropTypes.string,
    enabled: PropTypes.bool,
    checked: PropTypes.bool,
    visible: PropTypes.bool,
    type: PropTypes.oneOf([
      'normal',
      'separator',
      'submenu',
      'checkbox',
      'radio'
    ]),
    click: PropTypes.func
  }),
  children: PropTypes.node,
  indx: PropTypes.number,
  changeCheckState: PropTypes.func
};

MenuItem.defaultProps = {
  menuItem: {
    id: '',
    enabled: true,
    label: '',
    checked: false,
    visible: true,
    type: 'normal',
    accelerator: '',
    position: ''
  },
  children: null,
  indx: 0,
  changeCheckState: () => {}
};

MenuItem.contextType = ThemeContext;

export default MenuItem;
