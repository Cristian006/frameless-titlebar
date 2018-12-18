import React, { Component } from 'react';
import TitleBar from 'frameless-titlebar';
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
      <div className="ExampleContainer">
        <TitleBar
          icon={gitIcon}
          title="Project Name"
          menu={githubTemplate}
          theme={{
            barTheme: 'dark',
            barShowBorder: true,
            menuDimItems: false,
            showIconDarLin: false
          }}
          platform={platform}
        />
        <div className="GitToolbar">
          <div className="GitSection" style={{ maxWidth: 300 }} />
          <div className="GitSection">
            <div className="GitSection" style={{ maxWidth: 250 }} />
            <div className="GitSection" style={{ maxWidth: 250, marginRight: 10 }} />
          </div>
        </div>
        {children}
      </div>
    );
  }
}

export default GitHub;
