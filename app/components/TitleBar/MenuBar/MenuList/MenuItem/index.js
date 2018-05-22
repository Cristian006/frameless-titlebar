import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { remote } from 'electron';


const checked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"/></svg>
const unchecked = <span />
const radioUnchecked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
const radioChecked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>

const Label = styled.span`
  flex-grow: 1;
  margin-left: ${props => props.checked ? '0px' : '10px'};
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Accelerator = styled.span`
  flex-shrink: 0;
  margin-right: 10px;
  color: #6a737d;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  opacity: ${props => props.enabled ? '1' : '0.3'};
  font-size: 12px;
  padding: 0 10px;
  height: 30px;
  color: inherit;
  cursor: default;

  &:hover {
    background-color: ${props => props.enabled ? props.highlightColor : ''};
  }

  &:hover,
  &:hover ${Accelerator} {
    color: ${props => props.enabled ? props.textHighlightColor : ''};
  }
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
  handleClick = (e) => {
    const {
      menuItem,
    } = this.props;

    if (menuItem.enabled === false) {
      e.stopPropagation();
      return;
    }

    this.props.menuItem.click(this.props.menuItem, remote.getCurrentWindow(), e);
  };

  render() {
    const {
      children,
      onMouseEnter,
      onMouseLeave,
      menuItem,
      menuHighlightColor,
      menuTextHighlightColor,
    } = this.props;

    const isSubMenu = (menuItem.type && menuItem.type.toLowerCase() === 'submenu');

    if (menuItem.visible === false) {
      return null;
    }

    if (menuItem.type && (menuItem.type.toLowerCase() === 'separator')) {
      return <Seperator />;
    }

    return (
      <Wrapper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        enabled={menuItem.enabled}
        onClick={this.handleClick}
        highlightColor={menuHighlightColor}
        textHighlightColor={menuTextHighlightColor}
      >
        <Label
          checked={menuItem.checked}
        >
          {menuItem.label}
        </Label>
        <Accelerator>
          {menuItem.accelerator}
        </Accelerator>
        {
          (isSubMenu) &&
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
        {isSubMenu && children}
      </Wrapper>
    );
  }
}

MenuItem.propTypes = {
  menuItem: PropTypes.shape({
    label: PropTypes.string,
    enabled: PropTypes.bool,
    checked: PropTypes.bool,
    visible: PropTypes.bool,
    type: PropTypes.oneOf([
      'normal',
      'separator',
      'submenu',
      'checkbox',
      'radio'
    ]),
    click: PropTypes.func,
  }),
  children: PropTypes.node,
  menuTextHighlightColor: PropTypes.string,
  menuHighlightColor: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

MenuItem.defaultProps = {
  menuItem: {
    id: '',
    enabled: true,
    label: '',
    checked: false,
    visible: true,
    type: 'normal',
    accelerator: '',
    position: '',
  },
  children: null,
  menuTextHighlightColor: '#fff',
  menuHighlightColor: '#0372ef',
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};
