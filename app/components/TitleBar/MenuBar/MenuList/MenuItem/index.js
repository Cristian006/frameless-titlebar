import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { remote } from 'electron';

const checked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z" /></svg>;
const unchecked = <span />;
const radioUnchecked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" /></svg>;
const radioChecked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" /></svg>;
const arrow = <svg version="1.1" width="24px" height="24px"><g id="Rounded"><path d="M9.29,6.71L9.29,6.71c-0.39,0.39-0.39,1.02,0,1.41L13.17,12l-3.88,3.88c-0.39,0.39-0.39,1.02,0,1.41l0,0c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59c0.39-0.39,0.39-1.02,0-1.41l-4.59-4.59C10.32,6.32,9.68,6.32,9.29,6.71z" /></g></svg>;

const Label = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusIcon = styled.div`
  width: 12px;
  height: 12px;
  color: ${props => props.hovering ? props.theme.menuActiveTextColor : (props.theme.accentStatusIcon ? props.theme.menuHighlightColor : props.theme.menuActiveTextColor)};
  & svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

const Accelerator = styled.span`
  flex-shrink: 0;
  margin-right: 10px;
  color: ${props => props.hovering ? props.theme.menuTextHighlightColor : props.theme.menuAcceleratorColor};
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
  background-color: ${props => props.hovering ? props.theme.menuHighlightColor : ''};
  color: ${props => props.hovering ? props.theme.menuTextHighlightColor : ''};
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

const Separator = styled.hr`
  display: block;
  width: 100%;
  border: none;
  height: 1px;
  border-bottom: 1px solid ${props => props.theme.menuSeparatorColor};
`;

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
  }

  handleMouseEnter = (e) => {
    const {
      menuItem,
    } = this.props;

    if (menuItem.enabled === false) {
      e.stopPropagation();
      return;
    }
    this.setState({
      hovering: true,
    });
  };

  handleMouseLeave = (e) => {
    const {
      menuItem,
    } = this.props;

    if (menuItem.enabled === false) {
      e.stopPropagation();
      return;
    }
    this.setState({
      hovering: false,
    });
  };

  handleClick = (e) => {
    const {
      menuItem,
    } = this.props;

    if (menuItem.enabled === false) {
      e.stopPropagation();
      return;
    }

    switch (menuItem.type) {
      case 'checkbox': {
        e.persist();
        const newMenuItem = {
          ...menuItem,
          checked: !menuItem.checked,
        };
        menuItem.click(newMenuItem, remote.getCurrentWindow(), e);
        // TODO: Change Checked State
        return;
      }
      case 'radio': {
        e.persist();
        const newMenuItem = {
          ...menuItem,
          checked: true,
        };
        menuItem.click(newMenuItem, remote.getCurrentWindow(), e);
        if (!menuItem.checked) {
          // TODO: Change Checked State
        }
        return;
      }
      default:
        e.persist();
        menuItem.click(this.props.menuItem, remote.getCurrentWindow(), e);
        break;
    }
  };

  render() {
    const {
      children,
      menuItem,
    } = this.props;

    const isSubMenu = (menuItem.type && menuItem.type.toLowerCase() === 'submenu');

    if (menuItem.visible === false) {
      return null;
    }

    if (menuItem.type && (menuItem.type.toLowerCase() === 'separator')) {
      return <Separator />;
    }

    let statusIcon = <span />;

    if (menuItem.type === 'radio') {
      statusIcon = menuItem.checked ? radioChecked : radioUnchecked;
    } else if (menuItem.type === 'checkbox') {
      statusIcon = menuItem.checked ? checked : unchecked;
    }

    return (
      <Wrapper
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        enabled={menuItem.enabled}
        onClick={this.handleClick}
        hovering={this.state.hovering}
      >
        <StatusIcon hovering={this.state.hovering}>
          {statusIcon}
        </StatusIcon>
        <Label
          checked={menuItem.checked}
        >
          {menuItem.label}
        </Label>
        <Accelerator hovering={this.state.hovering}>
          {menuItem.accelerator}
        </Accelerator>
        {
          (isSubMenu) &&
          <SubMenuArrow>
            {arrow}
          </SubMenuArrow>
        }
        {(isSubMenu && this.state.hovering) && children}
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
};

export default withTheme(MenuItem);
