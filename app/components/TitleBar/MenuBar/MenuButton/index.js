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

  background-color: ${props => props.open ? props.theme.menuBackgroundColor : ((props.hovering && props.enabled) ? props.theme.menuItemHoverBackground : 'transparent')};
  border-color: ${props => props.open ? props.theme.menuBackgroundColor : ''};
  color: ${props => props.open ? props.theme.menuActiveTextColor : props.theme.menuItemTextColor};

  & svg {
    fill: currentColor;
    width: 20px;
    height: 20px;
  }

  &:focus:not(.focus-ring) {
    outline: none;
  }
`;

const Label = styled.div`
  opacity: ${props => props.enabled ? (((props.open || props.hovering) || !props.theme.menuDimItems) ? 1 : props.theme.menuDimOpacity) : props.theme.menuDisabledOpacity};
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
      enabled,
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
            enabled={enabled}
            hovering={hovering}
            tabIndex="-1"
          >
            <Label
              enabled={enabled}
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
  enabled: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  open: PropTypes.bool,
  closed: PropTypes.bool,
  hovering: PropTypes.bool,
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
  open: false,
  closed: false,
  hovering: false,
  enabled: true,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onMouseOver: () => {},
  onMouseMove: () => {},
  onTouchStart: () => {},
  onFocus: () => {},
  onClick: () => {},
  rectRef: () => {}
};
