import React, { Component } from 'react';
import TitleBar from 'electron-titlebar';
import signalIcon from 'assets/images/signal.png';
import { signalTemplate } from 'utils/menus';
import './styles.css';

class Signal extends Component {
  render() {
    const {
      children,
      platform
    } = this.props;
    return (
      <div className="ExampleContainer">
        <TitleBar
          icon={signalIcon}
          app="Signal"
          menu={signalTemplate}
          theme={{
            barTheme: 'dark',
            barBackgroundColor: '#2090ea',
            menuHighlightColor: '#2090ea',
            barShowBorder: true,
            barBorderBottom: '1px solid #1a70b7',
            menuDimItems: false
          }}
          platform={platform}
        />
        <div className="SignalContainer">
          <div className="SignalSide" background="#fafafa">
            <div className="SignalToolbar">Signal</div>
            <div className="SignalSearch" />
          </div>
          <div className="SignalRight">
            <div className="SignalToolbar" />
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Signal;
