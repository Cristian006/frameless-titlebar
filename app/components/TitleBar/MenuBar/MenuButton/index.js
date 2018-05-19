import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  -webkit-appearance: none;
  border: none;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
  text-align: left;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-size: 12px;
  padding: 0 10px;

  background-color: ${props => props.open ? '#fff' : ((props.hovering && !props.disabled) ? '#2f363d' : 'transparent')};
  border-color: ${props => props.open ? '#fff' : 'initial'};
  color: ${props => props.open ? '#24292e' : ((props.hovering && !props.disabled) ? '#fff' : 'inherit')};

  &:focus:not(.focus-ring) {
    outline: none;
  }
`;

const Item = styled.div`

`;

const Label = styled.div`
  opacity: ${props => props.open ? '1' : '0.6'};
`;

const View = styled.span`

`;

const Text = styled.span`

`;

export default class MenuButton extends Component {
  render() {
    const {
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onMouseMove,
      onTouchStart,
      onFocus,
      onClick,
      label,
      open,
      closed,
      disabled,
      hovering,
      rectRef,
    } = this.props;

    return (
      <Wrapper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onClick={onClick}
        innerRef={rectRef}
      >
        {this.props.children}
        <ButtonWrapper
          open={open}
        >
          <Button
            hovering={hovering}
            tabIndex="-1"
            open={open}
            disabled={disabled}
          >
            <Item>
              <Label open={open}>
                <View>
                  <Text aria-hidden="true">{label}</Text>
                </View>
              </Label>
            </Item>
          </Button>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

MenuButton.propTypes = {
  label: PropTypes.string.isRequired
};
