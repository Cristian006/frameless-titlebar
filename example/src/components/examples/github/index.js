import React, { Component } from 'react';
import TitleBar from 'electron-titlebar';
import gitIcon from 'assets/images/github.png';
import { githubTemplate } from 'utils/menus';
import './styles.css';

class GitHub extends Component {
  render() {
    const {
      children,
      platform
    } = this.props;
    return (
      <div>
        <TitleBar
          icon={gitIcon}
          menu={githubTemplate}
          theme={{
            barTheme: 'dark',
            barShowBorder: true,
            menuDimItems: false
          }}
          platform={platform}
        />
        <div className="Toolbar">
          <div className="Section" style={{ maxWidth: 300 }} />
          <div className="Section">
            <div className="Section" style={{ maxWidth: 250 }} />
            <div className="Section" style={{ maxWidth: 250, marginRight: 10 }} />
          </div>
        </div>
        {children}
      </div>
    );
  }
}

export default GitHub;
