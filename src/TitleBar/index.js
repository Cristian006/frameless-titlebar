import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { darkTheme, lightTheme } from './Theme';
import os from 'os';
import MenuBar from './MenuBar';
import WindowControls from './WindowControls';
import {
  Bar,
  Title,
  ResizeHandle,
  Icon
} from './components';

class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.setKeyById = this.setKeyById.bind(this);
    this.getKeyById = this.getKeyById.bind(this);
    this._generatePlatformChildren = this._generatePlatformChildren.bind(this);
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
    onIconClick,
    onTitleClick,
    onCloseClick,
    onMinimizeClick,
    onMaximizeClick,
    disableMaximize,
    disableMinimize,
    onBarDoubleClick
  }) {
    switch (platform) {
      case 'win32': // win32
        return (
          <Bar
            isWin
            theme={currentTheme}
          >
            <ResizeHandle top />
            <ResizeHandle left />
            {
              currentTheme.menuStyle === 'vertical' &&
                <MenuBar
                  ref={r => { this.Menu = r; }}
                  theme={currentTheme}
                  menu={menu}
                />
            }
            {
              icon &&
              <Icon
                src={icon}
                onClick={onIconClick}
              />
            }
            {
              app &&
              <Title
                isWin
                theme={currentTheme}
                onClick={onTitleClick}
              >
                {app}
              </Title>
            }
            {
              currentTheme.menuStyle === 'horizontal' &&
                <MenuBar
                  ref={r => { this.Menu = r; }}
                  theme={currentTheme}
                  menu={menu}
                />
            }
            {children}
            <WindowControls
              theme={currentTheme}
              disableMinimize={disableMinimize}
              disableMaximize={disableMaximize}
              onCloseClick={onCloseClick}
              onMinimizeClick={onMinimizeClick}
              onMaximizeClick={onMaximizeClick}
            />
          </Bar>
        );
      default:
        return (
          <Bar
            onDoubleClick={onBarDoubleClick}
            theme={currentTheme}
          >
            <ResizeHandle top />
            <ResizeHandle left />
            {
              (title || app) &&
              <Title
                theme={currentTheme}
                onClick={onTitleClick}
                flex={1}
              >
                {
                  (icon && currentTheme.showIconDarLin) &&
                  <Icon
                    src={icon}
                    onClick={onIconClick}
                  />
                }
                {(title || app)}
              </Title>
            }
          </Bar>
        );
    }
  }

  render() {
    const {
      theme,
      platform
    } = this.props;

    const currentTheme = {
      ...(theme.barTheme === 'light' ? lightTheme : darkTheme),
      ...theme
    };

    return this._generatePlatformChildren({
      ...this.props,
      currentTheme,
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
  disableMaximize: PropTypes.bool,
  /* Functions */
  onIconClick: PropTypes.func,
  onTitleClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  onMinimizeClick: PropTypes.func,
  onMaximizeClick: PropTypes.func,
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
  menu: [],

  /* Click Listeners */
  onIconClick: () => {},
  onTitleClick: () => {},
  onCloseClick: () => {},
  onMinimizeClick: () => {},
  onMaximizeClick: () => {},
  onBarDoubleClick: () => {}
};

export default TitleBar;
