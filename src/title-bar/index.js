import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import WindowControls from './window-controls';
import MenuBar from './menu-bar';
import useWindowFocus from './effects/useWindowFocus';
import styles from './style.css';
import { useTheme, ThemeContext } from './theme';
import Title from './components/title';
import Bar from './components/bar';

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
  title,
  currentWindow
}) => {
  const focused = useWindowFocus();
  const currentTheme = useTheme(theme);
  const isWin = platform === 'win32';
  const stacked = currentTheme.menuStyle === 'stacked';
  const vertical = currentTheme.menuStyle === 'vertical';
  return (
    <ThemeContext.Provider value={currentTheme}>
      <>
        <Bar isWin={isWin} onDoubleClick={onDoubleClick}>
          <div className={cx(styles.ResizeHandle, styles.Top)} />
          <div className={cx(styles.ResizeHandle, styles.Left)} />
          {
            !vertical && icon && <img className={styles.Logo} src={icon} />
          }
          {!stacked && (
            <MenuBar
              focused={focused}
              menu={menu}
              currentWindow={currentWindow}
            />
          )}
          {
            vertical && icon && <img className={styles.Logo} src={icon} />
          }
          <Title focused={focused} isWin={isWin}>
            {title}
          </Title>
          {children}
          {isWin && (
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
        {stacked && (
          <Bar isWin={isWin} bottomBar>
            <MenuBar
              focused={focused}
              menu={menu}
              currentWindow={currentWindow}
            />
          </Bar>
        )}
      </>
    </ThemeContext.Provider>
  );
};

TitleBar.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  platform: PropTypes.string,
  theme: PropTypes.object,
  children: PropTypes.node,
  menu: PropTypes.array,
  currentWindow: PropTypes.object,
  /* window */
  disableMinimize: PropTypes.bool,
  disableMaximize: PropTypes.bool,
  onMinimize: PropTypes.func,
  onMaximize: PropTypes.func,
  onClose: PropTypes.func,
  onDoubleClick: PropTypes.func
};

export default TitleBar;
