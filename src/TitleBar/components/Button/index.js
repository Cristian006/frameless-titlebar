import React, { Component } from 'react';
import ThemeContext from '../../Theme';
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
      onClick
    } = this.props;

    const {
      hovering,
      focused
    } = this.state;

    let backgroundColor = 'transparent';
    let opacity = 0.5;
    let transition = 'background-color 0.25s ease';
    let color = this.context.windowControlsColor;
    if (hovering) {
      opacity = 1;
      color = close ? this.context.windowCloseHover : color;
      backgroundColor = close ? this.context.windowCloseBackground : this.context.windowDefaultBackground;
    } else if (focused) {
      opacity = 1;
      color = close ? this.context.windowCloseHover : color;
      backgroundColor = close ? this.context.windowCloseActive : this.context.windowDefaultActive;
      transition = 'none';
    }

    return (
      <button
        className={styles.Button}
        style={{ backgroundColor, opacity, transition, color }}
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

Button.contextType = ThemeContext;

export default Button;
