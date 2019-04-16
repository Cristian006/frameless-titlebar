import React, { Component } from 'react';
import PropTypes from 'prop-types';
import electron from 'electron';
import {
  Button
} from '../components';
import {
  MimimizeIcon,
  MaximizeIcon,
  RestoreIcon,
  CloseIcon
} from '../utils/icons';

const currentWindow = electron.remote.getCurrentWindow();

const styles = {
  Container: {
    flexGrow: 0,
    flexShrink: 0,
    marginLeft: 'auto',
    fontFamily: 'initial',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 2000
  },
  ControlsContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: 138,
  },
  ActionsContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  }
}

export default class WindowControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMaximized: currentWindow.isMaximized()
    };
    this.onMaximizeClicked = this.onMaximizeClicked.bind(this);
    this.onMinimizeClicked = this.onMinimizeClicked.bind(this);
    this.onCloseClicked = this.onCloseClicked.bind(this);
    this.handleMaximize = this.handleMaximize.bind(this);
    this.handleUnMaximize = this.handleUnMaximize.bind(this);
    this.setMaximized = this.setMaximized.bind(this);
  }

  componentDidMount() {
    currentWindow.on('maximize', this.handleMaximize);
    currentWindow.on('unmaximize', this.handleUnMaximize);
  }

  componentWillUnmount() {
    currentWindow.removeListener('maximize', this.handleMaximize);
    currentWindow.removeListener('unmaximize', this.handleUnMaximize);
  }

  get isMinimizable() {
    const { disableMinimize } = this.props;
    return (!disableMinimize || !currentWindow.isMinimizable());
  }

  get isMaximizable() {
    const { disableMaximize } = this.props;
    return (!disableMaximize || !currentWindow.isResizable() || !currentWindow.isMaximizable());
  }

  handleUnMaximize() {
    this.setMaximized(false);
  }

  handleMaximize() {
    this.setMaximized(true);
  }

  setMaximized(isMaximized) {
    this.setState({ isMaximized });
  }

  onMaximizeClicked(e) {
    if (this.isMaximizable) {
      if (currentWindow.isMaximized()) {
        currentWindow.unmaximize();
      } else {
        currentWindow.maximize();
      }
    }
  };

  onMinimizeClicked(e) {
    if (this.isMinimizable) {
      currentWindow.minimize();
    }
  }

  onCloseClicked(e) {
    currentWindow.close();
  }

  render() {
    const { theme } = this.props;
    const { isMaximized } = this.state;

    return (
      <div style={styles.Container}>
        {
          this.props.windowActions && (
            <div style={styles.ActionsContainer}>
              {this.props.windowActions}
            </div>
          )
        }
        <div style={styles.ControlsContainer}>
          <Button
            theme={theme}
            key="min-button"
            ariaLabel="minimize"
            tabIndex="-1"
            disabled={!this.isMinimizable}
            onClick={this.onMinimizeClicked}
          >
            <MimimizeIcon />
          </Button>
          <Button
            theme={theme}
            key="max-button"
            ariaLabel="maximize"
            tabIndex="-1"
            disabled={!this.isMaximizable}
            onClick={this.onMaximizeClicked}
          >
            {
              isMaximized ? <RestoreIcon /> : <MaximizeIcon />
            }
          </Button>
          <Button
            theme={theme}
            key="close-button"
            aria-label="close"
            tabIndex="-1"
            onClick={this.onCloseClicked}
            close
          >
            <CloseIcon />
          </Button>
        </div>
      </div>
    );
  }
}

WindowControls.propTypes = {
  disableMinimize: PropTypes.bool,
  disableMaximize: PropTypes.bool
};

WindowControls.defaultProps = {
  disableMinimize: false,
  disableMaximize: false
};
