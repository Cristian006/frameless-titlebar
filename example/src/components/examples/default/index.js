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
          icon={defaultIcon}
          menu={defaultTemplate}
          app="Electron Titlebar"
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
