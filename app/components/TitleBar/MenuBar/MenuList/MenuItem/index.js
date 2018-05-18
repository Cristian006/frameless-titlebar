import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuItem from '../MenuItem';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
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

// TODO: Add checked icon left
// Add arrow icon right

export default class MenuItem extends Component {
  render() {
    const {
      label,
      onClick,
      children,
      disabled,
      checked,
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
        {children}
      </Wrapper>
    );
  }
}

MenuItem.propTypes = {
  label: PropTypes.string,
};
