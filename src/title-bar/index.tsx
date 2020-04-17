import React, { Fragment } from 'react';
import cx from 'classnames';
import WindowControls from './window-controls';
import MenuBar from './menu-bar';
import useWindowFocus from './effects/useWindowFocus';
import styles from './style.css';
import { useTheme, ThemeContext } from './theme';
import Title from './components/title';
import Bar from './components/bar';
import { TitleBarProps } from './typings';
import Logo from './components/logo';

const TitleBar = ({
  onMinimize,
  onMaximize,
  onClose,
  onDoubleClick,
  disableMaximize,
  disableMinimize,
  platform,
  children,
  theme,
  menu,
  icon,
  iconSrc,
  title,
  currentWindow
}: TitleBarProps) => {
  const focused = useWindowFocus();
  const currentTheme = useTheme(theme, platform);
  const isDarwin = platform === 'darwin';
  const stacked = currentTheme?.menu?.style === 'stacked';
  const vertical = currentTheme?.menu?.style === 'vertical';
  const controlsRight = currentTheme?.controls?.layout === 'right';
  const hasIcon = !!icon || !!iconSrc;
  const hasMenu = !isDarwin && ((menu?.length ?? 0) > 0);
  const hasTitle = !!(title && title !== '');
  return (
    <ThemeContext.Provider value={currentTheme}>
      <Fragment>
        <Bar onDoubleClick={onDoubleClick}>
          <div className={cx(styles.ResizeHandle, styles.Top)} />
          <div className={cx(styles.ResizeHandle, styles.Left)} style={{ height: theme?.bar?.height }} />
          {!isDarwin && !controlsRight && (
            <WindowControls
              focused={focused}
              disableMaximize={disableMaximize}
              disableMinimize={disableMinimize}
              onMinimize={onMinimize}
              onMaximize={onMaximize}
              onClose={onClose}
            />
          )}
          {
            !vertical && hasIcon && <Logo src={iconSrc} hasTitle={hasTitle}>{icon}</Logo>
          }
          {!isDarwin && !stacked && hasMenu && (
            <MenuBar
              focused={focused}
              menu={menu}
              currentWindow={currentWindow}
            />
          )}
          {
            vertical && hasIcon && <Logo src={iconSrc} hasTitle={hasTitle}>{icon}</Logo>
          }
          <Title
            focused={focused}
            hasIcon={hasIcon}
            hasMenu={hasMenu}
          >
            {title}
          </Title>
          {children}
          {!isDarwin && controlsRight && (
            <WindowControls
              focused={focused}
              disableMaximize={disableMaximize}
              disableMinimize={disableMinimize}
              onMinimize={onMinimize}
              onMaximize={onMaximize}
              onClose={onClose}
            />
          )}
        </Bar>
        {!isDarwin && stacked && (
          <Bar bottomBar>
            {
              hasMenu &&
              <MenuBar
                focused={focused}
                menu={menu}
                currentWindow={currentWindow}
              />
            }
          </Bar>
        )}
      </Fragment>
    </ThemeContext.Provider>
  );
};

export default TitleBar;
