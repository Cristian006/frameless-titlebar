import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from '../style.css';
import { MinimizeIcon, MaximizeIcon, CloseIcon } from './icons';
import { ThemeContext } from '../theme';

const WindowControls = ({
  onMinimize,
  onMaximize,
  onClose,
  focused
}) => {
  const { inActiveOpacity } = useContext(ThemeContext);
  return (
    <div
      className={styles.ControlsWrapper}
      style={{ opacity: focused ? 1 : inActiveOpacity }}
    >
      <div className={styles.ControlsButton} key="minimize" onClick={onMinimize}>
        <MinimizeIcon isWin />
      </div>
      <div className={styles.ControlsButton} key="maximize" onClick={onMaximize}>
        <MaximizeIcon isWin />
      </div>
      <div
        className={cx(styles.ControlsButton, {
          [styles.Close]: true
        })} key="close" onClick={onClose}
      >
        <CloseIcon isWin />
      </div>
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
