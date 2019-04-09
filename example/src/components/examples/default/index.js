import React, { Component } from 'react';
import TitleBar, { Button } from 'frameless-titlebar';
import defaultIcon from 'assets/images/icon.png';
import { defaultTemplate } from 'utils/menus';

class Default extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasNotifications: true
    };
  }

  render() {
    const {
      children,
      platform
    } = this.props;
    return (
      <div className="ExampleContainer">
        <TitleBar
          ref={r => { this.titleBar = r; }}
          icon={defaultIcon}
          menu={defaultTemplate}
          app="Electron Titlebar"
          theme={{
            barTheme: 'dark',
            menuStyle: 'stacked'
          }}
          platform={platform}
          windowActions={
            <Button
              backgroundColor={this.state.hasNotifications ? 'yellow' : 'transparent'}
              backgroundHover="yellow"
              color={this.state.hasNotifications ? 'black' : 'white'}
              onClick={() => this.setState({ hasNotifications: false })}
            >
              <i className="material-icons">
                notifications_active
              </i>
            </Button>
          }
        />
        {
          platform === 'win32' &&
          <div style={{ padding: 12, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => {
            // get the current menu item with id of 'hello'
            let current = this.titleBar.getKeyById('hello');
            // toggle the enabled key for menu item with id of 'hello'
            this.titleBar.setKeyById('hello', 'enabled', !current.enabled);
          }}>
            Click to Toggle App {`>`} Disabled Menu Item
          </div>
        }
        {children}
      </div>
    );
  }
}

export default Default;
