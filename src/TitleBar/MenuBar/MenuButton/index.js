import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './styles.css';

const styles = {
  Wrapper: {
    minWidth: 0,
    flexShrink: 0,
    height: '100%',
    boxSizing: 'content-box',
    outline: 'none'
  },
  Label: {
    whiteSpace: 'nowrap',
    maxWidth: 100,
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  ButtonWrapper: {
    width: '100%',
    height: '100%'
  },
  Button: {
    WebkitAppearance: 'none',
    border: 'none',
    boxShadow: 'none',
    background: 'transparent',
    borderRadius: 0,
    textAlign: 'left',
    margin: 0,
    padding: 0,
    height: '100%',
    width: '100%',
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10,
    boxSizing: 'border-box',
  }
};

export default class MenuButton extends Component {
  render() {
    const {
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onMouseMove,
      onTouchStart,
      onFocus,
      onClick,
      label,
      open,
      enabled,
      hovering,
      rectRef,
      theme
    } = this.props;

    let backgroundColor = open ? theme.menuBackgroundColor : ((hovering && enabled) ? theme.menuItemHoverBackground : 'transparent');
    let borderColor = open ? theme.menuBackgroundColor : '';
    let color = open ? theme.menuActiveTextColor : theme.menuItemTextColor;
    let opacity = enabled ? (((open || hovering) || !theme.menuDimItems) ? 1 : theme.menuDimOpacity) : theme.menuDisabledOpacity;

    return (
      <div
        style={{...styles.Wrapper, ...this.props.style}}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onFocus={onFocus}
        onClick={onClick}
        ref={rectRef}
        tabIndex="-1"
        aria-haspopup={true}
      >
        {this.props.children}
        <div
          style={styles.ButtonWrapper}
        >
          <button
            className={css.MenuButton}
            style={{
              ...styles.Button,
              backgroundColor,
              borderColor,
              color
            }}
            tabIndex="-1"
          >
            <div
              style={{
                opacity
              }}
            >
              <span
                style={{
                  ...styles.Label
                }}
                aria-hidden="true"
              >
                {label}
              </span>
            </div>
          </button>
        </div>
      </div>
    );
  }
}

MenuButton.propTypes = {
  children: PropTypes.node,
  enabled: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  open: PropTypes.bool,
  closed: PropTypes.bool,
  hovering: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  rectRef: PropTypes.func
};

MenuButton.defaultProps = {
  open: false,
  closed: false,
  hovering: false,
  enabled: true,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onMouseOver: () => {},
  onMouseMove: () => {},
  onTouchStart: () => {},
  onFocus: () => {},
  onClick: () => {},
  rectRef: () => {}
};
