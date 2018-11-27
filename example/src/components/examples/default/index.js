import React, { Component } from 'react';
import TitleBar from 'electron-titlebar';
import defaultIcon from 'assets/images/icon.png';
import { defaultTemplate } from 'utils/menus';

class Default extends Component {
  render() {
    const {
      children,
      platform
    } = this.props;
    return (
      <div>
        <TitleBar
          icon={defaultIcon}
          menu={defaultTemplate}
          title="Electron Titlebar"
          theme={{
            barTheme: 'dark'
          }}
          platform={platform}
        />
        {children}
      </div>
    );
  }
}

export default Default;
