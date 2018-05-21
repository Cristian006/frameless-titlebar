// @flow
import * as React from 'react';
import TitleBar from '../components/TitleBar';
import menu from './tempMenu';
// import slackIcon from './Slack.svg';
// import githubIcon from './Github.png';
// import signalIcon from './Signal.png';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <TitleBar
          key="original"
          icon={`${__dirname}/../resources/icon.png`}
          title="Electron Title Bar"
          menu={menu}
          showBorder
        />
        {this.props.children}
      </div>
    );
  }
}

/*
  <TitleBar
    key="two"
    icon={githubIcon}
    title="GitHub"
    menu={menu}
    showBorder
  />
  <TitleBar
    key="one"
    icon={signalIcon}
    backgroundColor="#2090ea"
    menuHighlightColor="#2090ea"
    dimMenuItems={false}
    menu={menu}
  />
  <TitleBar
    key="one"
    icon={slackIcon}
    backgroundColor="#362335"
    menuHighlightColor="#52a98c"
    menu={menu}
  />
*/
