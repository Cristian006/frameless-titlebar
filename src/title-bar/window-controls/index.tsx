import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from '../style.css';
import { MinimizeIcon, MaximizeIcon, CloseIcon } from './icons';
import { ThemeContext } from '../theme';
import WindowButton from './button';
import { WindowControlsProps, ControlsTheme } from '../typings';

const buttons = (isWin: boolean, onMinimize: () => void, onMaximize: () => void, onClose: () => void, disableMinimize: boolean, disableMaximize: boolean) => ([
  {
    type: 'minimize',
    onClick: onMinimize,
    icon: <MinimizeIcon isWin={isWin} />,
    disabled: disableMinimize
  },
  {
    type: 'maximize',
    onClick: onMaximize,
    icon: <MaximizeIcon isWin={isWin} />,
    disabled: disableMaximize
  },
  {
    type: 'close',
    onClick: onClose,
    icon: <CloseIcon isWin={isWin} />,
    disabled: false
  }
])

const WindowControls = ({
  onMinimize,
  onMaximize,
  onClose,
  disableMinimize,
  disableMaximize,
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
        buttons(isWin, onMinimize!, onMaximize!, onClose!, disableMinimize!, disableMaximize!).map((b) => {
          return (
            <WindowButton
              key={b.type}
              platform={platform}
              close={b.type === 'close'}
              onClick={b.onClick}
              isDisabled={b.disabled}
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
