import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './TitleBar.css';
import MenuBar from './MenuBar';
import WindowControls from './WindowControls';

export default class TitleBar extends Component {
  render() {
    const {
      children,
      title,
      icon,
      menu,
      disableMinimize,
      disableMaximize,
      backgroundColor,
      className,
      onTitleClick,
      onIconClick,
    } = this.props;

    return (
      <div
        id="electron-title-bar"
        className={`${styles.wrapper} ${className || ''}`}
        data-tid="container"
        style={{
          backgroundColor,
        }}
      >
        <div className={`${styles.resizeHandle} ${styles.resizeTop}`} />
        <div className={`${styles.resizeHandle} ${styles.resizeLeft}`} />
        {
          icon &&
          <img
            className={styles.icon}
            src={icon}
            alt="app-icon"
            onClick={onIconClick}
          />
        }
        {
          title &&
          <div
            className={styles.title}
            onClick={onTitleClick}
          >
            {title}
          </div>
        }
        <MenuBar menu={menu} />
        {children}
        <WindowControls
          disableMinimize={disableMinimize}
          disableMaximize={disableMaximize}
        />
      </div>
    );
  }
}

TitleBar.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  title: PropTypes.string,
  disableMinimize: PropTypes.bool,
  disableMaximize: PropTypes.bool,
  menu: PropTypes.array,
  backgroundColor: PropTypes.string,
  onIconClick: PropTypes.func,
  onTitleClick: PropTypes.func,
};

TitleBar.defaultProps = {
  disableMinimize: false,
  disableMaximize: false,
  title: '',
  icon: '',
  menu: [],
  backgroundColor: '#24292e',
  titleColor: '#fff',
  color: '',
  onIconClick: () => {},
  onTitleClick: () => {},
};
