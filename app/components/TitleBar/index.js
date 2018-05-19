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
  background-color: ${props => props.backgroundColor}
`;

const Title = styled.div`
  line-height: ${props => props.height}
  margin: 0px 6px 0px 0px;
  padding: 0px 4px;
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
      disableMinimize,
      disableMaximize,
      onTitleClick,
      onIconClick,
      height,
      backgroundColor,
    } = this.props;

    return (
      <Bar
        height={height}
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
            height={height}
            onClick={onTitleClick}
          >
            {title}
          </Title>
        }
        <MenuBar menu={menu} />
        {children}
        <WindowControls
          disableMinimize={disableMinimize}
          disableMaximize={disableMaximize}
        />
      </Bar>
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
  height: PropTypes.string,
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
  height: '28px',
  backgroundColor: '#24292e',
  titleColor: '#fff',
  onIconClick: () => {},
  onTitleClick: () => {},
};
