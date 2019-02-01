import React, { Component } from 'react';
import TitleBar from 'frameless-titlebar';
import defaultIcon from 'assets/images/icon.png';
import { defaultTemplate } from 'utils/menus';

class Default extends Component {
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
            barTheme: 'dark'
          }}
          platform={platform}
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
