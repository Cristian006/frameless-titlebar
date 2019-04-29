import React, { Component } from 'react';
import styles from './styles.css';

const style = {
  Container: {
    WebkitAppRegion: 'no-drag',
    position: 'relative',
    padding: 0,
    margin: 0,
    overflow: 'hidden',
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: 'transparent',
    transition: 'background-color 0.25s ease',
    opacity: 0.5,
    boxSizing: 'content-box',
  },
  WindowsContainer: {
    width: '46px',
    height: '100%',
  },
  LinuxContainer: {
    marginRight: '5px',
    width: '16px',
    height: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: '50%',
  }
}

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
      isWin,
    } = this.props;

    const {
      hovering,
      focused
    } = this.state;

    let backgroundColor = (!isWin && close) ? theme.linuxCloseBackground : 'transparent';
    let opacity = (!isWin && close) ? 1 : 0.5;
    let border = (!isWin) ? theme.linuxBorder : 'none';
    let transition = 'background-color 0.25s ease';
    let color = (!isWin && close) ? theme.linuxCloseColor : theme.windowControlsColor;
    if (focused) {
      opacity = 1;
      color = (close ? theme.windowCloseHover : undefined);
      backgroundColor = (close ? (isWin ? theme.windowCloseActive : theme.linuxCloseActive) : theme.windowDefaultActive);
      transition = 'none';
    } else if (hovering) {
      opacity = 1;
      color = (close ? theme.windowCloseHover : undefined);
      backgroundColor = (close ? (isWin ? theme.windowCloseBackground : theme.linuxCloseBackground) : theme.windowDefaultBackground);
    }

    return (
      <button
        className={styles.FramelessTitlebarButton}
        style={{
          ...style.Container,
          ...(isWin ? style.WindowsContainer : style.LinuxContainer),
          backgroundColor,
          opacity,
          transition,
          color,
          border
        }}
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
