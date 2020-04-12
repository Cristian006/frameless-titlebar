import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from '../style.css';
import { MinimizeIcon, MaximizeIcon, CloseIcon } from './icons';
import { ThemeContext } from '../theme';
import WindowButton from './button';
import { WindowControlsProps, ControlsTheme } from '../typings';

const buttons = (isWin: boolean, onMinimize: () => void, onMaximize: () => void, onClose: () => void) => ([
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
}: WindowControlsProps) => {
  const {
    platform,
    bar,
    controls
  } = useContext(ThemeContext);
  const isWin = platform === 'win32';
  const width = platform === 'win32' ? '146px' : '120px';
  return (
    <div
      className={styles.ControlsWrapper}
      style={{
        opacity: focused ? 1 : bar!.inActiveOpacity,
        width
      }}
    >
      {
        buttons(isWin, onMinimize!, onMaximize!, onClose!).map((b) => {
          return (
            <WindowButton
              key={b.type}
              platform={platform}
              close={b.type === 'close'}
              onClick={b.onClick}
              controls={controls as Required<ControlsTheme>}
            >
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
