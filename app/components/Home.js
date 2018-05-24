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
import whatIcon from '../images/What.png';

const ExampleContainer = styled.div`
  padding:20px;
  text-align: left;
  & h2 {
    margin-bottom: 0px;
    font-size: 5rem;
  }
`;

const Wrapper = styled.div`

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

  getNormal = (children) => {
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
        {children}
      </Wrapper>
    );
  };

  getGit = (children) => {
    const ToolBar = styled.div`
      height: 50px;
      background-color: #24292e;
      display: flex;
    `;

    const Section = styled.div`
      display: flex;
      font-size: 0.8em;
      flex: 1;
      height: 100%;
      margin-right: ${props => props.marginRight};
      max-width: ${props => props.maxWidth};
      border-right: 1px solid #000;
    `;

    return (
      <Wrapper>
        <TitleBar
          icon={githubIcon}
          menu={githubTemplate}
          theme={{
            barTheme: 'dark',
            barShowBorder: true,
            menuDimItems: false,
          }}
        />
        <ToolBar>
          <Section />
          <Section>
            <Section maxWidth="250px" />
            <Section maxWidth="250px" marginRight="10px" />
          </Section>
        </ToolBar>
        {children}
      </Wrapper>
    );
  };

  getSignal = (children) => {
    const SideSection = styled.div`
      background-color: ${props => props.background};
      max-width: ${props => props.width};
      height: calc(100vh - 28px);
      flex: 1;
    `;

    const Toolbar = styled.div`  
      background-color: ${props => props.background};
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-left: 20px;
      line-height: 64px;
      height: 64px;
      font-size: 1.4em;
      flex: 1;
      border-right: 1px solid #1a70b7;
    `;

    const Search = styled.div`
      background-color: #fff;
      border: solid 1px #f3f3f3;
      height: 36px;
    `;

    const Horizontal = styled.div`
      display: flex;
      position: relative;
    `;

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
            barShowBorder: true,
            barBorderBottom: '1px solid #1a70b7',
            menuDimItems: false,
          }}
        />
        <Horizontal>
          <SideSection width="300px" background="#fafafa">
            <Toolbar background="#2090ea">Signal</Toolbar>
            <Search />
          </SideSection>
          <SideSection>
            <Toolbar background="#2090ea" />
            {children}
          </SideSection>
        </Horizontal>
      </Wrapper>
    );
  };

  getWhatsApp = (children) => {
    const SideSection = styled.div`
      background-color: ${props => props.background};
      max-width: ${props => props.width};
      height: calc(100vh - 28px);
      flex: 1;
    `;

    const Toolbar = styled.div`  
      background-color: ${props => props.background};
      border-right: ${props => props.border};
      color: #000;
      line-height: 56px;
      height: 56px;
      font-size: 1.4em;
      flex: 1;
      padding-top: 8px;
      padding-left: 8px;
    `;

    const Circle = styled.div`
      border-radius: 50%;
      width: 48px;
      height: 48px;
      background-color: #dedede;
    `;

    const Search = styled.div`
      background-color: #fbfbfb;
      border: solid 1px #f3f3f3;
      height: 36px;
    `;
    
    const SearchBar = styled.div`
      background-color: #ffffff;
      margin: 8px 16px;
    `;

    const Horizontal = styled.div`
      display: flex;
      position: relative;
    `;

    return (
      <Wrapper>
        <TitleBar
          icon={whatIcon}
          title="WhatsApp"
          theme={{
            barTheme: 'light',
            barBackgroundColor: '#eaeaea',
            menuHighlightColor: '#33c151',
            menuDimItems: false,
          }}
        />
        <Horizontal>
          <SideSection width="300px" background="#fafafa">
            <Toolbar background="#eeeeee" border="1px solid #dddddd">
              <Circle />
            </Toolbar>
            <Search>
              <SearchBar />
            </Search>
          </SideSection>
          <SideSection background="#ebe8e3">
            <Toolbar background="#eeeeee" />
            {children}
          </SideSection>
        </Horizontal>
      </Wrapper>
    );
  };


  getSlack = (children) => {
    const ToolBar = styled.div`
      border-bottom: 1px solid #dddddd;
      display: flex;
      flex: 1;
      height: 50px;
    `;

    const SideSection = styled.div`
      background-color: ${props => props.background};
      max-width: ${props => props.width};
      height: calc(100vh - 28px);
      flex: 1;
    `;

    const Horizontal = styled.div`
      display: flex;
      position: relative;
    `;

    return (
      <Wrapper>
        <TitleBar
          icon={slackIcon}
          title="Slack - ProjectName"
          menu={slackTemplate}
          theme={{
            barTheme: 'dark',
            barBackgroundColor: '#251d24',
            menuStyle: 'vertical',
            menuHighlightColor: '#52a98c',
            menuDimItems: false,
          }}
        />
        <Horizontal>
          <SideSection background="#332832" width="50px" />
          <SideSection background="#4D394B" width="220px" />
          <SideSection background="#fff" flex="1">
            <ToolBar />
            {children}
          </SideSection>
        </Horizontal>
      </Wrapper>
    );
  };

  changeTitleBar = (value) => {
    this.setState({
      type: value,
    });
  }

  render() {
    const container = (
      <ExampleContainer>
        <h2>Examples</h2>
        <ChangeTheme
          key="default"
          onClick={() => {
            this.changeTitleBar('normal');
          }}
        >
          Default
        </ChangeTheme>
        <ChangeTheme
          key="signal"
          onClick={() => {
            this.changeTitleBar('signal');
          }}
        >
          Signal
        </ChangeTheme>
        <ChangeTheme
          key="what"
          onClick={() => {
            this.changeTitleBar('what');
          }}
        >
          WhatsApp
        </ChangeTheme>
        <ChangeTheme
          key="git"
          onClick={() => {
            this.changeTitleBar('git');
          }}
        >
          GitHub
        </ChangeTheme>
        <ChangeTheme
          key="slack"
          onClick={() => {
            this.changeTitleBar('slack');
          }}
        >
          Slack
        </ChangeTheme>
      </ExampleContainer>
    );
    let Bar = <span />;
    switch (this.state.type) {
      case 'git':
        Bar = this.getGit(container);
        break;
      case 'slack':
        Bar = this.getSlack(container);
        break;
      case 'signal':
        Bar = this.getSignal(container);
        break;
      case 'what':
        Bar = this.getWhatsApp(container);
        break;
      default:
        Bar = this.getNormal(container);
        break;
    }
    return (
      <div>
        {Bar}
      </div>
    );
  }
}
