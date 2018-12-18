import React, { Component } from 'react';
import TitleBar from 'frameless-titlebar';
import slackIcon from 'assets/images/slack.svg';
import { slackTemplate } from 'utils/menus';
import './styles.css';

class Slack extends Component {
  render() {
    const {
      children,
      platform
    } = this.props;
    return (
      <div className="ExampleContainer">
        <TitleBar
          icon={slackIcon}
          app="Slack - ElectronTitlebar"
          menu={slackTemplate}
          theme={{
            barTheme: 'dark',
            barBackgroundColor: '#251d24',
            menuStyle: 'vertical',
            menuHighlightColor: '#52a98c',
            menuDimItems: false
          }}
          platform={platform}
        />
        <div className="SlackContainer">
          <div className="SlackSide" style={{ background: "#332832", maxWidth: 50, minWidth: 50 }} />
          <div className="SlackSide" style={{ background: "#4D394B", maxWidth: 220, minWidth: 200 }} />
          <div className="SlackSection" style={{ background: "#fff", flex: 1 }} >
            <div className="SlackToolbar" />
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Slack;
