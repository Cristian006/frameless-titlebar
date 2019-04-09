import React, { Component } from 'react';
import styles from './styles.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      focused: false
    };
  }

  toggleHover = () => {
    this.setState({
      hovering: !this.state.hovering
    });
  }

  toggleFocus = () => {
    this.setState({
      focused: !this.state.focused
    });
  }

  render() {
    const {
      ariaLabel,
      tabIndex,
      disabled,
      close,
      onClick,
      theme,
      backgroundColor,
      color,
      backgroundHover,
      colorHover,
      colorActive,
      backgroundActive,
    } = this.props;

    const {
      hovering,
      focused
    } = this.state;

    let bgColor = backgroundColor || 'transparent';
    let opacity = 0.5;
    let transition = 'background-color 0.25s ease';
    let buttonColor = color || theme.windowControlsColor;
    if (hovering) {
      opacity = 1;
      buttonColor = colorHover || (close ? theme.windowCloseHover : color);
      bgColor = backgroundHover || (close ? theme.windowCloseBackground : theme.windowDefaultBackground);
    } else if (focused) {
      opacity = 1;
      buttonColor = colorActive || (close ? theme.windowCloseHover : color);
      bgColor = backgroundActive || (close ? theme.windowCloseActive : theme.windowDefaultActive);
      transition = 'none';
    }

    return (
      <button
        className={styles.Button}
        style={{ backgroundColor: bgColor, opacity, transition, color: buttonColor }}
        onFocus={this.toggleFocus}
        onBlur={this.toggleFocus}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={onClick}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
        disabled={disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
