import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-height: 30px;
  max-width: 240px;
  height: 100%;
  width: 100%;
  min-width: 0;
  opacity: ${props => props.disabled ? '0.3' : '1'};
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
  height: 12px;
  margin-right: 10px;
`;

export default class MenuItem extends Component {
  render() {
    const {
      label,
      onClick,
      children,
      disabled,
      checked,
      showArrow,
    } = this.props;

    return (
      <Wrapper
        disabled={disabled}
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
            <svg version="1.1" x="0px" y="0px" width="24px"
              height="24px">
              <g id="Bounding_Boxes">
                <path fill="none" d="M0,0h24v24H0V0z"/>
              </g>
              <g id="Rounded">
                <path d="M9.29,6.71L9.29,6.71c-0.39,0.39-0.39,1.02,0,1.41L13.17,12l-3.88,3.88c-0.39,0.39-0.39,1.02,0,1.41l0,0
                  c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59c0.39-0.39,0.39-1.02,0-1.41l-4.59-4.59C10.32,6.32,9.68,6.32,9.29,6.71z"/>
              </g>
            </svg>
          </SubMenuArrow>
        }
        {children}
      </Wrapper>
    );
  }
}

MenuItem.propTypes = {
  label: PropTypes.string,
};
