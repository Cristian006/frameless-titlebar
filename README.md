# Electron Titlebar #WindowsAppsNeedLoveToo

> Customizable Electron Titlebar for frameless windows built with React

A lot of people like developing apps with the Electron framework because it's cross platform. Developers write code once and run it everywhere. Developers are building beautiful applications that look great on MacOS, you can easily set the title bar to be hidden and be left with 3 cute little round buttons on the top left corner that look like a stop light. On Windows however, Electron applications are often left untouched when it comes to the title bar. In my opinion, the default menu and title bar don't work well with some stylized applications such as Atom, VS Code or Signal. Slack has a custom title bar in their desktop application but even then, they use the default menu layout which is fine but, it would probably look a little more unified if they used a custom menu. This is of course hugely inspired by GitHub's desktop application which was the first Electron app I saw to get the title bar correctly. If we're going to be using Web Technologies to build desktop applications we might as well make them look dope all around, right?

## Usage

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
    titleBarStyle: 'hidden',
  });
```

In your app's root container render method:

```js
import TitleBar from 'electron-titlebar';
import menu from './AppMenu'; // import your menu file
...
export default class App extends React.Component {
  ...
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
```

## Documentation

| Name | Type | Platforms | Description | Default Value |
| :--------- | :--: | :----------: | :------- | :----: |
| icon | string | Windows |The App Icon shown on the top left | '' |
| title | string | Windows |The App Title shown on the top left | '' |
| menu | array | All | The array of menu items | [] |
| theme | object | All | Theme object to customize Titlebar | See Bellow |

```js
// This is the default theme
// Override any of these values by passing object into TitleBar Element via the theme property
export const darkTheme = {
  /* Title */
  barTheme: 'dark', /* Light, Dark */
  barHeight: '28px',
  barColor: '#fff',
  barTitleColor: 'inherit',
  barBackgroundColor: '#24292e',
  barShowBorder: false,
  barBorderBottom: '1px solid #000',

  /* Menu */
  menuStyle: 'horizontal', /* horizontal, vertical */
  menuDimItems: true,
  menuDimOpacity: 0.6,
  menuDisabledOpacity: 0.3,
  menuWidth: 240,
  menuBackgroundColor: '#fff',
  menuItemTextColor: '#fff',
  menuItemHoverBackground: 'rgba(255,255,255,0.3)',
  menuActiveTextColor: '#24292e',
  menuTextHighlightColor: '#fff',
  menuHighlightColor: '#0372ef',
  accentStatusIcon: false,
  menuSubLabelHeaders: true,
  menuSubLabelColor: '#6a737d',
  menuAcceleratorColor: '#6a737d',
  menuShowBoxShadow: true,
  menuBoxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',

  /* Menu Overlay */
  menuOverlayBackground: 'black',
  menuOverlayOpacity: 0.4,
  menuSeparatorColor: '#e1e4e8',

  /* WindowControls */
  windowControlsColor: '#fff',
  windowCloseHover: '#fff',
  windowCloseBackground: '#e81123',
  windowCloseActive: '#bf0f1d',
  windowDefaultBackground: 'rgba(255,255,255,0.3)',
  windowDefaultActive: 'rgba(255,255,255,0.2)',
};
```

## TODO

- [ ] All menus have fixed `width` to make it easier to calculate what side to render the submenu on. Menus should have dynamic `width` with a `max-width` property.
- [ ] Add default role functions to be more in-line with Electron MenuItem
- [ ] Add position and id properties to menu item objects for ordering the menu item list
- [ ] Add ability to change default icons with custom icons

## Examples

### Multi-Level Submenu Example / Submenu Header Labels

![Default][default]

```js
<TitleBar
  icon={`${__dirname}/../resources/icon.png`}
  title="Electron Title Bar"
  menu={defaultTemplate}
/>
```

### GitHub - Dark Theme Example

![Github][github]

```js
<TitleBar
  icon={githubIcon}
  menu={githubTemplate}
  theme={{
    barTheme: 'dark',
    barShowBorder: true,
    menuDimItems: false,
  }}
/>
```

### Signal

![Signal][signal]

```js
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
```

### WhatsApp - Light Theme Example

![WhatsApp][what]

```js
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
```

### Slack - Vertical Menu Example

![Slack][slack]

```js
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
```

[default]: ./app/images/DefaultExample.png "Default"
[github]: ./app/images/GithubExample.png "GitHub"
[slack]: ./app/images/SlackExample.png "Slack"
[signal]: ./app/images/SignalExample.png "Signal"
[what]: ./app/images/WhatsAppExample.png "WhatsApp"
