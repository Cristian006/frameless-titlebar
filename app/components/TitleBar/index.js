import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuBar from './MenuBar';
import WindowControls from './WindowControls';

const Bar = styled.div`
  height: ${props => props.height};
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  width: 100%;
  -webkit-app-region: drag;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;
  background-color: ${props => props.backgroundColor}
  border-bottom: ${props => props.showBorder ? props.borderBottom : ''};
`;

const Title = styled.div`
  line-height: ${props => props.height}
  margin: 0px 6px 0px 0px;
  padding: 0px 4px;
  color: ${props => props.titleColor}
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
  render() {
    const {
      children,
      title,
      icon,
      menu,
      theme,
      height,
      titleColor,
      showBorder,
      borderBottom,
      backgroundColor,
      disableMinimize,
      disableMaximize,
      dimMenuItems,
      menuBackgroundColor,
      menuTextColor,
      menuTextHighlightColor,
      menuHighlightColor,
      onTitleClick,
      onIconClick,
      onCloseClick,
      onMinimizeClick,
      onMaximizeClick,
    } = this.props;

    return (
      <Bar
        height={height}
        showBorder={showBorder}
        borderBottom={borderBottom}
        backgroundColor={backgroundColor}
      >
        <ResizeTop />
        <ResizeLeft />
        {
          icon &&
          <Icon
            src={icon}
            alt="app-icon"
            onClick={onIconClick}
          />
        }
        {
          title &&
          <Title
            color={titleColor || (theme === 'dark' ? '#fff' : '#24292e')}
            height={height}
            onClick={onTitleClick}
          >
            {title}
          </Title>
        }
        <MenuBar
          menu={menu}
          theme={theme}
          dimMenuItems={dimMenuItems}
          menuBackgroundColor={menuBackgroundColor}
          menuTextColor={menuTextColor}
          menuTextHighlightColor={menuTextHighlightColor}
          menuHighlightColor={menuHighlightColor}
        />
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
  }
}

TitleBar.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  title: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  showBorder: PropTypes.bool,
  borderBottom: PropTypes.string,
  titleColor: PropTypes.string,
  /* Menu */
  menu: PropTypes.array,
  dimMenuItems: PropTypes.bool,
  menuBackgroundColor: PropTypes.string,
  menuTextColor: PropTypes.string,
  menuTextHighlightColor: PropTypes.string,
  menuHighlightColor: PropTypes.string,
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
  /* Main */
  icon: '',
  title: '',
  titleColor: '',
  showBorder: false,
  borderBottom: '1px solid #000',
  backgroundColor: '#24292e',
  theme: 'dark',
  height: '28px',

  /* Menu */
  dimMenuItems: true,
  menuBackgroundColor: '#fff',
  menuTextColor: '#24292e',
  menuTextHighlightColor: '#fff',
  menuHighlightColor: '#0372ef',

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
