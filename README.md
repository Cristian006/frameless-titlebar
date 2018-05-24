# Electron Titlebar #WindowsAppsNeedLoveToo

> Customizable Electron Titlebar for frameless windows built with React

A lot of people like developing apps with the Electron framework because it's cross platform. "It's every developer's dream" to write code once and run it anwywhere. Developers everywhere are building beautiful applications that look great on MacOS because you can easily set the title bar to be hidden and you're left with 3 cute little round buttons on the top left corner that look like a stop light. On Windows however, Electron applications are often left untouched when it comes to the title bar. Most applications are left with the default title bar and menu which, in my opinion, doesn't work well with some stylized applications such as Atom, VS Code or Signal. Slack has a custom title bar in their desktop application but even then, they use the default menu layout which is fine, but it'd probably look a little more polished and unified if they used a custom menu. This is of course, hugely inspired by GitHub's desktop application which was the first Electron app I saw to get the title bar correctly. If we're going to be using Web Technologies to build desktop applications we might as well make them look dope all around, right?

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

| Name | Type | Platforms | Description | Default Value |
| :--------- | :--: | :----------: | :------- | :----: |
| icon | string | Windows |The App Icon shown on the top left | '' |
| title | string | Windows |The App Title shown on the top left | '' |
| menu | array | All | The array of menu items | [] |
| backgroundColor | string | All | The Titlebar's background color | '#24292e' |
| showBottomBorder | bool | All | Show a bottom border on the title bar | false |
| borderBottom | string | All | The border for the bottom of the title bar | '1px solid #000' |
| titleColor | string | Windows | The title's text color | '' |
| color | string | Windows | The bar's text color for menu items | '#fff' |
| dimMenuItems | bool | Windows | If true, the menu item's opacity is set to `0.6` and on hover set to `1` | true |
| menuBackgroundColor | string | Windows | The background color of the menu panes | #fff |
| menuTextColor | string | Windows | The text color of menu items | '#24292e' |
| menuTextHighlightColor | string | Windows | The text color of menu items when hovering over them | '#fff' |
| menuHighlightColor | string | Windows | The highlight color of menu items when hovering over them | '#0372ef' |

## TODO

- [ ] All menus have fixed `width` to make it easier to calculate what side to render the submenu on. Menus should have dynamic `width` with a `max-width` property.
- [ ] Add default role functions to be more in-line with Electron MenuItem
- [ ] Add position and id properties to menu item objects for ordering the menu item list
- [ ] Add ability to change default icons with custom icons

## Examples

### Multi-Level Submenu Example / Submenu Header Labels

![Default][default]

### GitHub - Dark Theme Example

![Github][github]

### Signal

![Signal][signal]

### WhatsApp - Light Theme Example

![WhatsApp][what]

### Slack - Vertical Menu Example

![Slack][slack]

[default]: ./app/images/DefaultExample.png "Default"
[github]: ./app/images/GithubExample.png "GitHub"
[slack]: ./app/images/SlackExample.png "Slack"
[signal]: ./app/images/SignalExample.png "Signal"
[what]: ./app/images/WhatsAppExample.png "WhatsApp"
