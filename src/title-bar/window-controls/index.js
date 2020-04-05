import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from '../style.css';
import { MinimizeIcon, MaximizeIcon, CloseIcon } from './icons';
import { ThemeContext } from '../theme';
import WindowButton from './button';

const buttons = (isWin, onMinimize, onMaximize, onClose) => ([
  {
    type: 'minimize',
    onClick: onMinimize,
    icon: <MinimizeIcon isWin={isWin} />
  },
  {
    type: 'maximize',
    onClick: onMaximize,
    icon: <MaximizeIcon isWin={isWin} />
  },
  {
    type: 'close',
    onClick: onClose,
    icon: <CloseIcon isWin={isWin} />
  }
])

const WindowControls = ({
  onMinimize,
  onMaximize,
  onClose,
  focused
}) => {
  const {
    platform,
    bar: {
      inActiveOpacity
    },
    controls
  } = useContext(ThemeContext);
  const isWin = platform === 'win32';
  return (
    <div
      className={styles.ControlsWrapper}
      style={{ opacity: focused ? 1 : inActiveOpacity, color: controls.color }}
    >
      {
        buttons(isWin, onMinimize, onMaximize, onClose).map((b) => {
          return (
            <WindowButton key={b.type} close={b.type === 'close'} onClick={b.onClick} controls={{ ...controls }}>
              {b.icon}
            </WindowButton>
          )
        })
      }
    </div>
  );
};

WindowControls.propTypes = {
  focused: PropTypes.bool,
  onMinimize: PropTypes.func,
  onMaximize: PropTypes.func,
  onClose: PropTypes.func
}

export default WindowControls;
