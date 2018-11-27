import React, { Component } from 'react';
import TitleBar from 'electron-titlebar';
import codeIcon from 'assets/images/vscode.svg';
import { defaultTemplate } from 'utils/menus';
import './styles.css';

class Code extends Component {
  render() {
    const {
      children,
      platform
    } = this.props;
    return (
      <div className="ExampleContainer">
        <TitleBar
          icon={codeIcon}
          app="Code"
          title="index.js - electron-titlebar"
          menu={defaultTemplate}
          theme={{
            barTheme: 'dark',
            barBackgroundColor: 'rgb(36, 37, 38)',
            barColor: 'rgb(230, 230, 230)',
            menuHighlightColor: '#373277',
            menuDimItems: false,
            showIconDarLin: false
          }}
          platform={platform}
        />
        <div className="CodeContainer">
          <div className="CodeSide" style={{ background: "rgb(34, 34, 35)", maxWidth: 50, minWidth: 50 }} />
          <div className="CodeSide" style={{ maxWidth: 220, minWidth: 200 }} />
          <div className="CodeSection">
            <div className="CodeTabBar">
              <div className="ActiveTab"><img className="CodeIcon" src={codeIcon} />index.js</div>
            </div>
            <div className="CodeEditor">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Code;
