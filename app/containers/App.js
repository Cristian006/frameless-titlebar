// @flow
import * as React from 'react';
import TitleBar from '../components/TitleBar';
import menu from './tempMenu';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <TitleBar
          icon={`${__dirname}/../resources/icon.png`}
          title="Electron"
          menu={menu}
        />
        {this.props.children}
      </div>
    );
  }
}
