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

  background-color: ${props => props.open ? props.menuBackgroundColor : ((props.hovering && !props.disabled) ? (props.theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)') : 'transparent')};
  border-color: ${props => props.open ? props.menuBackgroundColor : 'initial'};
  color: ${props => props.open ? props.menuTextColor : 'inherit'};

  &:focus:not(.focus-ring) {
    outline: none;
  }
`;

const Label = styled.div`
  opacity: ${props => props.dimMenuItem ? ((props.open || props.hovering) ? '1' : '0.6') : '1'};
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
      theme,
      open,
      disabled,
      hovering,
      rectRef,
      dimMenuItem,
      menuBackgroundColor,
      menuTextColor,
    } = this.props;

    return (
      <Wrapper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onFocus={onFocus}
        onClick={onClick}
        innerRef={rectRef}
      >
        {this.props.children}
        <ButtonWrapper
          open={open}
        >
          <Button
            open={open}
            theme={theme}
            disabled={disabled}
            menuTextColor={menuTextColor}
            menuBackgroundColor={menuBackgroundColor}
            hovering={hovering}
            tabIndex="-1"
          >
            <Label
              dimMenuItem={dimMenuItem}
              hovering={hovering}
              open={open}
            >
              <Text aria-hidden="true">{label}</Text>
            </Label>
          </Button>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

MenuButton.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
  open: PropTypes.bool,
  closed: PropTypes.bool,
  hovering: PropTypes.bool,
  disabled: PropTypes.bool,
  dimMenuItem: PropTypes.bool,
  menuTextColor: PropTypes.string,
  menuBackgroundColor: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  rectRef: PropTypes.func,
};

MenuButton.defaultProps = {
  theme: 'dark',
  dimMenuItem: true,
  open: false,
  closed: false,
  hovering: false,
  disabled: false,
  menuTextColor: '#24292e',
  menuBackgroundColor: '#fff',
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onMouseOver: () => {},
  onMouseMove: () => {},
  onTouchStart: () => {},
  onFocus: () => {},
  onClick: () => {},
  rectRef: () => {}
};
