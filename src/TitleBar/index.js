import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, darkTheme, lightTheme } from './Theme';
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
  generatePlatformChildren = ({
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
    disableMinimize
  }) => {
    switch (platform) {
      case 'win32': // win32
        return (
          <Bar isWin>
            <ResizeHandle top />
            <ResizeHandle left />
            {/*
              currentTheme.menuStyle === 'vertical' &&
                <MenuBar
                  menu={menu}
                />
            */}
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
                onClick={onTitleClick}
                isWin
              >
                {app}
              </Title>
            }
            {/*
              currentTheme.menuStyle === 'horizontal' &&
                <MenuBar
                  menu={menu}
                />
            */}
            {children}
            <WindowControls
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
          <Bar>
            <ResizeHandle top />
            <ResizeHandle left />
            {
              (title || app) &&
              <Title
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

    return (
      <ThemeProvider value={currentTheme}>
        {
          this.generatePlatformChildren({
            ...this.props,
            currentTheme,
            platform: platform === 'default' ? os.platform() : (platform || os.platform())
          })
        }
      </ThemeProvider>
    );
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
  onMaximizeClick: () => {}
};

export default TitleBar;
