import React, { Component } from 'react';
import TitleBar from 'electron-titlebar';
import whatIcon from 'assets/images/whatsapp.png';
import './styles.css';

class WhatsApp extends Component {
  render() {
    const {
      children,
      platform
    } = this.props;
    return (
      <div className="ExampleContainer">
        <TitleBar
          icon={whatIcon}
          app="WhatsApp"
          theme={{
            barTheme: 'light',
            barBackgroundColor: '#eaeaea',
            menuHighlightColor: '#33c151',
            menuDimItems: false
          }}
          platform={platform}
        />
        <div className="WhatContainer">
          <div className="WhatSide" style={{ maxWidth: 300, minWidth: 200, background: '#fafafa' }}>
            <div className="WhatToolbar">
              <div className="WhatCircle" />
            </div>
            <div className="WhatSearch">
              <div className="WhatBar" />
            </div>
          </div>
          <div className="WhatSide" background="#ebe8e3">
            <div className="WhatToolbar" style={{ border: 'none' }} />
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default WhatsApp;
