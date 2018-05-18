import React, { Component } from 'react';
import PropTypes from 'prop-types';
import electron from 'electron';
import styles from './WindowControls.css';

const currentWindow = electron.remote.getCurrentWindow();

export default class WindowControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMaximized: currentWindow.isMaximized(),
    };
  }

  componentDidMount() {
    currentWindow.addListener('maximize', () => this.setState({ isMaximized: true }));
    currentWindow.addListener('unmaximize', () => this.setState({ isMaximized: false }));
  }

  componentWillUnmount() {
    currentWindow.removeListener('maximize', () => this.setState({ isMaximized: true }));
    currentWindow.removeListener('unmaximize', () => this.setState({ isMaximized: false }));  
  }

  handleMaximize = (max: boolean) => {
    this.setState({
      isMaximized: max,
    });
  };

  onMaximizeClicked = () => {
    if (currentWindow.isMaximizable()) {
      if (currentWindow.isMaximized()) {
        currentWindow.unmaximize();
      } else {
        currentWindow.maximize();
      }
    }
  };

  render() {
    const {
      disableMaximize,
      disableMinimize,
    } = this.props;
    const {
      isMaximized
    } = this.state;

    return (
      <div className={styles.windowControls}>
        <button
          aria-label="minimize"
          tabIndex="-1"
          disabled={disableMinimize}
          className={`${styles.windowControl} ${styles.windowMinimize}`}
          onClick={() => currentWindow.minimize()}
        >
          <svg
            version="1.1"
            aria-hidden="true"
            width="10"
            height="10"
          >
            <path
              d="M 0,5 10,5 10,6 0,6 Z"
            />
          </svg>
        </button>
        <button
          aria-label="maximize"
          tabIndex="-1"
          disabled={disableMaximize}
          className={`${styles.windowControl} ${styles.windowMaximize}`}
          onClick={this.onMaximizeClicked}
        >
          {
            isMaximized ?
              <svg
                version="1.1"
                aria-hidden="true"
                width="10"
                height="10"
              >
                <path
                  d="m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z"
                />
              </svg> :
              <svg
                version="1.1"
                aria-hidden="true"
                width="10"
                height="10"
              >
                <path
                  d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"
                />
              </svg>
          }
        </button>
        <button
          aria-label="close"
          tabIndex="-1"
          className={`${styles.windowControl} ${styles.windowClose}`}
          onClick={() => currentWindow.close()}
        >
          <svg
            aria-hidden="true"
            version="1.1"
            width="10"
            height="10"
          >
            <path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z" />
          </svg>
        </button>
      </div>
    );
  }
}


WindowControls.propTypes = {
  disableMinimize: PropTypes.bool,
  disableMaximize: PropTypes.bool,
};

WindowControls.defaultProps = {
  disableMinimize: false,
  disableMaximize: false,
};
