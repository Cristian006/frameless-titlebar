// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import styles from './Home.css';
import TitleBar from '../components/TitleBar';
import {
  defaultTemplate,
  slackTemplate,
  signalTemplate,
  githubTemplate,
} from '../utils/exampleMenus';
import slackIcon from '../images/Slack.svg';
import githubIcon from '../images/Github.png';
import signalIcon from '../images/Signal.png';

const ExampleContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 12px;
  text-align: left;
  & h2 {
    margin-bottom: 0px;
    font-size: 5rem;
  }
`;

const Wrapper = styled.div`

`;

const ToolBar = styled.div`
  height: 50px;
  background-color: #24292e;
  line-height: 50px;
  padding 0 2vw;
`;

const ChangeTheme = styled.div`
  cursor: pointer;
  font-size: 2em;
  font-weight: bold;
  color: #24292e;
  opacity: 0.4;
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'normal',
    };
  }

  getNormal = () => {
    return (
      <Wrapper>
        <TitleBar
          icon={`${__dirname}/../resources/icon.png`}
          title="Electron Title Bar"
          menu={defaultTemplate}
          theme={{
            barTheme: 'dark',
          }}
        />
      </Wrapper>
    );
  };

  getGit = () => {
    return (
      <Wrapper>
        <TitleBar
          icon={githubIcon}
          title="GitHub"
          menu={githubTemplate}
          theme={{
            barTheme: 'dark',
            barShowBorder: true,
          }}
        />
        <ToolBar>
          <div style={{ fontSize: '0.8em' }}>GitHub</div>
        </ToolBar>
      </Wrapper>
    );
  };

  getSignal = () => {
    return (
      <Wrapper>
        <TitleBar
          icon={signalIcon}
          title="Signal"
          menu={signalTemplate}
          theme={{
            barTheme: 'dark',
            barBackgroundColor: '#2090ea',
            menuHighlightColor: '#2090ea',
            dimMenuItems: false,
          }}
        />
        <ToolBar>
          <div style={{ fontSize: '0.8em' }}>GitHub</div>
        </ToolBar>
      </Wrapper>
    );
  };


  getSlack = () => {
    return (
      <Wrapper>
        <TitleBar
          icon={slackIcon}
          title="Slack"
          menu={slackTemplate}
          theme={{
            barTheme: 'dark',
            barBackgroundColor: '#362335',
            menuStyle: 'vertical',
            menuHighlightColor: '#52a98c',
            dimMenuItems: false,
          }}
        />
        <ToolBar>
          <div style={{ fontSize: '0.8em' }}>GitHub</div>
        </ToolBar>
      </Wrapper>
    );
  };

  changeTitleBar = (value) => {
    this.setState({
      type: value,
    });
  }

  render() {
    let Bar = <span />;
    switch (this.state.type) {
      case 'git':
        Bar = this.getGit();
        break;
      case 'slack':
        Bar = this.getSlack();
        break;
      case 'signal':
        Bar = this.getSignal();
        break;
      default:
        Bar = this.getNormal();
        break;
    }
    return (
      <div>
        {Bar}
        <ExampleContainer>
          <h2>Examples</h2>
          <ChangeTheme
            onClick={() => {
              this.changeTitleBar('normal');
            }}
          >
            Default
          </ChangeTheme>
          <ChangeTheme
            onClick={() => {
              this.changeTitleBar('git');
            }}
          >
            GitHub
          </ChangeTheme>
          <ChangeTheme
            onClick={() => {
              this.changeTitleBar('slack');
            }}
          >
            Slack
          </ChangeTheme>
          <ChangeTheme
            onClick={() => {
              this.changeTitleBar('signal');
            }}
          >
            Signal
          </ChangeTheme>
        </ExampleContainer>
      </div>
    );
  }
}
