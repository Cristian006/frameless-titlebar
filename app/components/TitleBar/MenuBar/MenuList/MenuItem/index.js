import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  opacity: ${props => props.enabled ? '1' : '0.3'};
  font-size: 12px;
  padding: 0 10px;
  height: 30px;
  color: #24292e;
  cursor: default;
  &:hover {
    color: ${props => props.enabled ? '#fff' : '#24292e'};
    border-color: ${props => props.enabled ? '#0366d6' : ''};
    background-color: ${props => props.enabled ? '#0372ef' : ''};
  }
`;

const Label = styled.span`
  flex-grow: 1;
  margin-left: ${props => props.checked ? '0px' : '10px'};
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SubMenuArrow = styled.div`
  flex-shrink: 0;
  opacity: 0.7;
  height: 24px;
  color: inherit;
  & svg {
    fill: currentColor;
  }
`;

const Seperator = styled.hr`
  display: block;
  width: 100%;
  border: none;
  height: 1px;
  border-bottom: 1px solid #e1e4e8;
`;

export default class MenuItem extends Component {
  render() {
    const {
      onMouseEnter,
      onMouseLeave,
      onClick,
      label,
      children,
      enabled,
      visiable,
      type,
      checked,
      showArrow,
    } = this.props;

    if (visiable === false) {
      return null;
    }

    if (type && (type.toLowerCase() === 'separator')) {
      return <Seperator />;
    }

    return (
      <Wrapper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        enabled={enabled}
        onClick={onClick}
      >
        <Label
          checked={checked}
        >
          {label}
        </Label>
        {
          showArrow &&
          <SubMenuArrow>
            <svg
              version="1.1"
              width="24px"
              height="24px"
            >
              <g id="Rounded">
                <path d="M9.29,6.71L9.29,6.71c-0.39,0.39-0.39,1.02,0,1.41L13.17,12l-3.88,3.88c-0.39,0.39-0.39,1.02,0,1.41l0,0
                  c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59c0.39-0.39,0.39-1.02,0-1.41l-4.59-4.59C10.32,6.32,9.68,6.32,9.29,6.71z"/>
              </g>
            </svg>
          </SubMenuArrow>
        }
        {showArrow && children}
      </Wrapper>
    );
  }
}

MenuItem.propTypes = {
  label: PropTypes.string,
  enabled: PropTypes.bool,
};

MenuItem.defaultProps = {
  enabled: true,
  label: '',
};
