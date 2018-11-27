import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import os from 'os';
import MenuBar from './MenuBar';
import WindowControls from './WindowControls';
import { darkTheme, lightTheme } from './utils';

const Bar = styled.div`
  height: ${props => props.isWin ? props.theme.winBarHeight : props.theme.barHeight};
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  width: 100%;
  -webkit-app-region: drag;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;
  background-color: ${props => props.theme.barBackgroundColor};
  color: ${props => props.theme.barColor};
  border-bottom: ${props => props.theme.barShowBorder ? props.theme.barBorderBottom : ''};
`;

const Title = styled.div`
  line-height: ${props => props.theme.barHeight};
  margin: 0px 6px 0px 0px;
  padding: ${props => props.isWin ? '0px 4px' : '0 70px'};
  color: ${props => props.theme.barTitleColor};
  text-align: center;
  flex: ${props => props.flex};
  display: flex;
  white-space: nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: row;
  -webkit-app-region: drag;
`;

const Icon = styled.img`
  height: 16px;
  width: 16px;
  margin: 6px;
`;

const ResizeHandle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  -webkit-app-region: no-drag;
`;

const ResizeLeft = styled(ResizeHandle)`
  width: 3px;
  height: 28px;
`;

const ResizeTop = styled(ResizeHandle)`
  width: 100%;
  height: 3px;
`;

export default class TitleBar extends Component {
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
            <ResizeTop />
            <ResizeLeft />
            {
              currentTheme.menuStyle === 'vertical' &&
                <MenuBar
                  menu={menu}
                />
            }
            {
              icon &&
              <Icon
                src={icon}
                alt='app-icon'
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
            {
              currentTheme.menuStyle === 'horizontal' &&
                <MenuBar
                  menu={menu}
                />
            }
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
            <ResizeTop />
            <ResizeLeft />
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
                    alt='app-icon'
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
      <ThemeProvider theme={currentTheme}>
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
  onMaximizeClick: () => {},
};
