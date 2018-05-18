import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 0;
  position: relative;
`;

const Button = styled.button`
  -webkit-appearance: none;
  border: none;
  box-shadow: none;
  background-color: ${props => props.open ? '#fff' : 'transparent'};
  border-color: ${props => props.open ? '#fff' : 'initial'};
  border-radius: 0;
  text-align: left;
  margin: 0;
  padding: 0 10px;
  border: 0;
  height: 100%;
  width: 100%;
  color: ${props => props.open ? '#24292e' : 'inherit'};
  
  &:active {  
    box-shadow: none;
  }

  &:focus {
    background-color: #2f363d;
    outline-offset: -4px;
    border-color: black;
    box-shadow: none;
  }

  &:focus:not(.focus-ring) {
    outline: none;
    background-color: transparent;
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
      label,
      hovering,
      open,
      closed,
    } = this.props;

    return (
      <Wrapper>
        <Button
          tabIndex="-1"
          open={open}
        >
          <Item>
            <Label open={open}>
              <View>
                <Text aria-hidden="true">{label}</Text>
              </View>
            </Label>
          </Item>
        </Button>
      </Wrapper>
    );
  }
}

MenuButton.propTypes = {
  label: PropTypes.string.isRequired
};
