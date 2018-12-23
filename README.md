# Frameless Titlebar for Electron Applications

> Customizable Titlebar for frameless windows built with React

![Main][main]

A lot of people like developing apps with the [Electron](https://electronjs.org/) framework because it's cross platform. On Windows however, Electron applications are often left untouched when it comes to the title bar. In my opinion, the default menu and title bar don't work well with some stylized applications such as Atom, VS Code or Signal. Apps would look a little more unified if they used a custom menu. This is of course hugely inspired by GitHub's desktop application. If we're going to be using Web Technologies to build desktop applications we might as well make them look dope all around, right?

## Adding frameless-titlebar to your project

```bash
yarn add frameless-titlebar
# or
npm install frameless-titlebar
```

In your electron `app.js` file:

```js
  // electron browser window set up
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    minWidth: 600, // set a min width!
    minHeight: 300, // and a min height!
    // Remove the window frame from windows applications
    frame: false,
    // Hide the titlebar from MacOS applications while keeping the stop lights
    titleBarStyle: 'hidden', // or 'customButtonsOnHover',
  });
```

In your app's root container render method:

```js
import TitleBar from 'frameless-titlebar';
import menu from './AppMenu'; // import your menu file
...
export default class App extends React.Component {
  ...
  render() {
    return (
      <div>
        <TitleBar
          icon={`${__dirname}/../resources/icon.png`}
          app="Electron"
          menu={menu}
        />
        {
          /* the rest of your application
          *  all your routes and stuff
          */
          this.props.children
        }
      </div>
    );
  }
}
```

## Documentation

| Name | Type | Platforms | Description | Default Value |
| :--------- | :--: | :----------: | :------- | :----: |
| icon | string | Windows | The App Icon shown on the top left | '' |
| app | string | All | The app name shown to the left of the menu items on Windows applications. On Mac/Linux this will show in the center of the toolbar if the title property is not set | '' |
| title | string | Mac | The title shown in the center of mac applications, this will override the app property | '' |
| menu | array | All | The array of menu items following the [Electron Menu Object Documentation/Template](https://electronjs.org/docs/api/menu "Electron Menu Documentation") | [] |
| theme | object | All | Theme object to customize Titlebar | [See Theme](src/TitleBar/Theme/index.js) |

## TODO

- [x] ~~Change Menu Item states - checkmarks, radios~~
- [x] ~~Add `before`, `after`, and `id` properties to menu item objects to order the menu item list~~
- [ ] Scroll menu vertically when overflowing window height
- [ ] Add a "more" menu item to the menu bar when the menu's items overflow the width of the menu bar
- [ ] Add default role functions to be more in-line with Electron MenuItem Documentation
- [ ] Instead of just hovering over to a submenu, add ability to lock a sub menu when parent menu is clicked on
- [ ] All menus have fixed `width` to make it easier to calculate what side to render the submenu on. Menus should have dynamic `width` with a `max-width` property.
- [ ] Add ability to change default icons with custom icons

## Not yet supported menu item properties

- `role` - default menu item roles
- `beforeGroupContaining` and `afterGroupContaining` - order menu items based on implicit groups defined by separators
- `registerAccelerator` - handle the registration of accelerators mapped to click functions

## Try the example

```bash
# clone the repository
git clone https://github.com/Cristian006/frameless-titlebar.git
# move into the project directory
cd frameless-titlebar
# install module dependancies
yarn # or npm install
# move into example folder
cd ./example
# install example dependancies
yarn # or npm install
# to start the application run
yarn dev
```

## Examples

### Multi-Level Submenu Example / Submenu Header Labels

![Default][winDefault]
![DarLinDefault][darDefault]

```js
<TitleBar
  icon={defaultIcon}
  app="Electron Title Bar"
  menu={defaultTemplate}
/>
```

### GitHub - Dark Theme Example

![Github][winGithub]
![DarGithub][darGithub]

```js
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
/>
```

### VSCode

![VSCode][winCode]
![DarCode][darCode]

```js
<TitleBar
  icon={codeIcon}
  app="Code"
  title="index.js - frameless-titlebar"
  menu={defaultTemplate}
  theme={{
    barTheme: 'dark',
    barBackgroundColor: 'rgb(36, 37, 38)',
    barColor: 'rgb(230, 230, 230)',
    menuHighlightColor: '#373277',
    menuDimItems: false,
    showIconDarLin: false
  }}
/>
```

### Signal

![Signal][winSignal]
![DarSignal][darSignal]

```js
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
/>
```

### WhatsApp - Light Theme Example

![WhatsApp][winWhat]
![DarWhatsApp][darWhat]

```js
<TitleBar
  icon={whatIcon}
  app="WhatsApp"
  theme={{
    barTheme: 'light',
    barBackgroundColor: '#eaeaea',
    menuHighlightColor: '#33c151',
    menuDimItems: false
  }}
/>
```

### Slack - Vertical Menu Example

![Slack][winSlack]
![Slack][darSlack]

> Leaving the dynamic project title in the app property is fine in this case since the toolbar menu has a vertical style where the menu items are to the left of the title

If you see the example for [VSCode](#VSCode) you'll see the app name can be set to "Code" (shortened title to the left of the menu items) and changing the title property will only be reflected on mac applications for the currently selected tab

```js
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
/>
```

[main]: ./example/src/assets/Main.png "Main"
[winDefault]: ./example/src/assets/win/Default.png "Default"
[winGithub]: ./example/src/assets/win/Github.png "GitHub"
[winSlack]: ./example/src/assets/win/Slack.png "Slack"
[winSignal]: ./example/src/assets/win/Signal.png "Signal"
[winWhat]: ./example/src/assets/win/WhatsApp.png "WhatsApp"
[winCode]: ./example/src/assets/win/VSCode.png "VSCode"


[darDefault]: ./example/src/assets/dar-lin/Default.png "Default"
[darGithub]: ./example/src/assets/dar-lin/Github.png "GitHub"
[darSlack]: ./example/src/assets/dar-lin/Slack.png "Slack"
[darSignal]: ./example/src/assets/dar-lin/Signal.png "Signal"
[darWhat]: ./example/src/assets/dar-lin/WhatsApp.png "WhatsApp"
[darCode]: ./example/src/assets/dar-lin/VSCode.png "VSCode"