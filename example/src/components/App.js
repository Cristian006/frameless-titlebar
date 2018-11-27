import '../assets/css/App.css';
import React, { Component } from 'react';
import TitleBar from 'electron-titlebar';
import { githubTemplate } from './exampleMenus';

class App extends Component {
  render() {
    return (
      <div>
        <TitleBar
          icon={`https://image.flaticon.com/icons/svg/443/443525.svg`}
          title='Electron'
          menu={githubTemplate}
          theme={{
            barTheme: 'dark',
            barShowBorder: true,
            menuDimItems: true,
          }}
        />
        <h1>Electron Titlebar</h1>
        <p>I ❤️ electron-titlebar!</p>
      </div>
    );
  }
}

export default App;
