import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import css from './styles.css';
import { parseAccelerator } from '../../utils';
import { checked, unchecked, radioChecked, radioUnchecked, arrow } from '../../../utils/icons';

const styles = {
  Container: {
    position: 'static',
    overflow: 'visible',
    padding: 0,
    transform: 'none',
    display: 'flex',
    cursor: 'default',
  },
  Wrapper: {
    fontSize: 12,
    padding: '0px 10px',
    height: '30px',
    color: 'inherit',
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    cursor: 'default',
  },
  Label: {
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'default',
    pointerEvents: 'none',
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
      indx,
    } = this.props;

    if (menuItem.enabled === false) {
      e.stopPropagation();
      return;
    }

    switch (menuItem.type) {
      case 'submenu': {
        // stop propagation only when initial target is this item specifically
        // e.stopPropagation(); 
        break;
      }
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
      menuItem,
      theme
    } = this.props;

    const {
      hovering
    } = this.state;

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
      <li
        ref={this.props.rectRef}
        style={{
          ...styles.Contianer,
          color: hovering ? theme.menuTextHighlightColor : '',
          opacity: menuItem.enabled ? '1' : '0.3',
          backgroundColor: hovering ? theme.menuHighlightColor : ''
        }}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onClick={this._handleClick}
        role="option"
      >
        <a style={{...styles.Wrapper, height: theme.menuItemHeight}}>
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
            {parseAccelerator(menuItem.accelerator)}
          </span>
          {
            (isSubMenu) &&
            <div
              className={css.SubMenuArrow}
            >
              {arrow}
            </div>
          }
        </a>
        {(isSubMenu && this.state.hovering) && children}
      </li>
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

export default MenuItem;
