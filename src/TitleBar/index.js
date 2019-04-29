import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { darkTheme, lightTheme } from './Theme';
import electron from 'electron';
import os from 'os';
import MenuBar from './MenuBar';
import WindowControls from './WindowControls';
import {
  Bar,
  Title,
  ResizeHandle,
  Icon
} from './components';

const currentWindow = electron.remote.getCurrentWindow();

class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inActive: !currentWindow.isFocused()
    };
    this.setKeyById = this.setKeyById.bind(this);
    this.getKeyById = this.getKeyById.bind(this);
    this._generatePlatformChildren = this._generatePlatformChildren.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
  }

  componentDidMount() {
    currentWindow.on('focus', this._handleFocus);
    currentWindow.on('blur', this._handleBlur);
  }

  componentWillUnmount() {
    currentWindow.removeListener('focus', this._handleFocus);
    currentWindow.removeListener('blur', this._handleBlur);
  }

  _handleBlur() {
    this._setInActive(true);
  }

  _handleFocus() {
    this._setInActive(false);
  }

  _setInActive(inActive) {
    this.setState({
      inActive
    });
  }

  setKeyById(id, key, value) {
    return this.Menu.setKeyById(id, key, value);
  }

  getKeyById(id, key) {
    return this.Menu.getKeyById(id, key);
  }

  _generatePlatformChildren({
    icon,
    app,
    title,
    platform,
    menu,
    children,
    currentTheme,
    disableMaximize,
    disableMinimize,
    windowActions,
    inActive,
  }) {

    if (platform === 'darwin') {
      return (
        <Bar
          theme={currentTheme}
        >
          <ResizeHandle top />
          <ResizeHandle height={currentTheme.barHeight} left />
          {
            (icon && currentTheme.showIconDarwin) &&
            <Icon
              notWin
              src={icon}
            />
          }
          {
            (title || app) &&
            <Title
              theme={currentTheme}
              inActive={inActive}
              align="center"
            >
              {(title || app)}
            </Title>
          }
          {children}
        </Bar>
      );
    }

    if (currentTheme.menuStyle === 'stacked') {
      return (
        <Fragment>
          <Bar
            isWin
            inActive={inActive}
            theme={currentTheme}
          >
            <ResizeHandle top />
            <ResizeHandle height={currentTheme.winBarHeight} left />
            {
              (platform !== 'win32' && currentTheme.controlsLayout === 'left') &&
              <WindowControls
                isWin={platform === 'win32'}
                theme={currentTheme}
                disableMinimize={disableMinimize}
                disableMaximize={disableMaximize}
                windowActions={windowActions}
              />
            }
            {
              icon &&
              <Icon
                src={icon}
              />
            }
            {
              app &&
              <Title
                isWin
                inActive={inActive}
                theme={currentTheme}
                align="left"
              >
                {app}
              </Title>
            }
            {
              title &&
              <Title
                isWin
                inActive={inActive}
                theme={currentTheme}
                align="center"
              >
                {title}
              </Title>
            }
            {children}
            {
              (platform === 'win32' || (platform !== 'win32' && currentTheme.controlsLayout === 'right')) &&
              <WindowControls
                isWin={platform === 'win32'}
                theme={currentTheme}
                disableMinimize={disableMinimize}
                disableMaximize={disableMaximize}
                windowActions={windowActions}
              />
            }
          </Bar>
          <Bar
            isWin
            inActive={inActive}
            theme={currentTheme}
          >
            <MenuBar
              ref={r => { this.Menu = r; }}
              inActive={inActive}
              theme={currentTheme}
              menu={menu}
            />
          </Bar>
        </Fragment>
      );
    }

    return (
      <Bar
        isWin
        inActive={inActive}
        theme={currentTheme}
      >
        <ResizeHandle top />
        <ResizeHandle height={currentTheme.winBarHeight} left />
        {
          (platform !== 'win32' && currentTheme.controlsLayout === 'left') &&
          <WindowControls
            isWin={platform === 'win32'}
            theme={currentTheme}
            disableMinimize={disableMinimize}
            disableMaximize={disableMaximize}
            windowActions={windowActions}
          />
        }
        {
          currentTheme.menuStyle === 'vertical' &&
            <MenuBar
              ref={r => { this.Menu = r; }}
              theme={currentTheme}
              inActive={inActive}
              menu={menu}
            />
        }
        {
          icon &&
          <Icon
            src={icon}
          />
        }
        {
          app &&
          <Title
            isWin
            theme={currentTheme}
            inActive={inActive}
            align="left"
          >
            {app}
          </Title>
        }
        {
          currentTheme.menuStyle === 'horizontal' &&
            <MenuBar
              ref={r => { this.Menu = r; }}
              theme={currentTheme}
              inActive={inActive}
              menu={menu}
            />
        }
        {
          title &&
          <Title
            isWin
            theme={currentTheme}
            inActive={inActive}
            align="center"
          >
            {title}
          </Title>
        }
        {children}
        {
          (platform === 'win32' || (platform !== 'win32' && currentTheme.controlsLayout === 'right')) &&
          <WindowControls
            isWin={platform === 'win32'}
            theme={currentTheme}
            disableMinimize={disableMinimize}
            disableMaximize={disableMaximize}
            windowActions={windowActions}
          />
        }
      </Bar>
    );
  }

  render() {
    const {
      theme,
      platform
    } = this.props;

    const {
      inActive
    } = this.state;

    const currentTheme = {
      ...(theme.barTheme === 'light' ? lightTheme : darkTheme),
      ...theme
    };

    return this._generatePlatformChildren({
      ...this.props,
      currentTheme,
      inActive,
      platform: platform === 'default' ? os.platform() : (platform || os.platform())
    });
  }
}

TitleBar.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  title: PropTypes.string,
  platform: PropTypes.string,
  theme: PropTypes.object,
  /* Menu */
  menu: PropTypes.array,
  /* Window */
  disableMinimize: PropTypes.bool,
  disableMaximize: PropTypes.bool
};

TitleBar.defaultProps = {
  children: null,

  /* Main */
  icon: '',
  name: '',
  title: '',
  platform: '',
  theme: {},

  /* WindowControls */
  disableMinimize: false,
  disableMaximize: false,

  /* Menu */
  menu: []
};

export default TitleBar;
