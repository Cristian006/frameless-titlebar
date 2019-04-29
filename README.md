# Frameless Titlebar for Electron Applications

> Customizable Titlebar for frameless windows built with React

![Main][main]

A lot of people like developing apps with the [Electron](https://electronjs.org/) framework because it's cross platform. On Windows however, Electron applications are often left untouched when it comes to the title bar. In my opinion, the default menu and title bar don't exaclty work well with some stylized applications such as Atom, VS Code or Signal. Apps would look a little more unified if they used a custom stylized menu. This is of course hugely inspired by the GitHub desktop application's menu bar.

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
    // this is important since currently there is no support for scrollable menus
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

### Menu Bar API (Windows)

```js
// create a reference to the titlebar to access api methods
<TitleBar
  ref={r => { this.titleBar = r; }}
  ...
/>
// eg. change menu item's enabled property
this.titleBar.setKeyById('menuItemId1', 'enabled', false);

// or access the api methods via menuBar event property
[
  // menu item list
  {
    // menu item
    ...
    click: (item, win, e) => {
      e.menuBar.setKeyById(item.id, 'enabled', !item.enabled);
    }
  }
]
```

| Name | Params | Description |
| :--- | :----: | :---------- |
| `setKeyById` | (`id` : string, `key` : string, `value` : any) | Set a menu item's key properties using this method |
| `getKeyById` | (`id` : string, `key` : string) | Get the menu item properties for the menu item with the corresponding id. If no key is specified then the function will return the entire menuItem object | 

### Titlebar properties

| Name | Type | Platforms | Description | Default Value |
| :--- | :--: | :-------: | :---------- | :-----------: |
| icon | string | Windows | The App Icon shown on the top left | '' |
| app | string | All | The app name shown to the left of the menu items on Windows applications. On Mac/Linux this will show in the center of the toolbar if the title property is not set | '' |
| title | string | Mac | The title shown in the center of mac applications, this will override the app property | '' |
| menu | array | All | The array of menu items following the [Electron Menu Object Documentation/Template](https://electronjs.org/docs/api/menu "Electron Menu Documentation"). See [Supported Menu Item Properties](#supported-menu-item-properties) | [] |
| theme | object | All | Theme object to customize Titlebar | [See Theme](src/TitleBar/Theme/index.js) |

### Supported Menu Item Properties

| Name | Type | Description |
| :--- | :--: | :---------- |
| `id` (optional) | `string` | Must be unique. If defined then it can be used as a reference to this item by the position attribute as well as the [`setKeyById`](#Menu-Bar-API-(Windows)) |
| `type` (optional) | oneOf([`normal`, `separator`, `submenu`, `checkbox`, `radio`]) | Type of supported menu items |
| `label` (optional) | `string` | Menu item label |
| `click` (optional) | `function(menuItem, browserWindow, event)` | access the menu bar API with `event.menuBar.apiMethodName()` |
| `enabled` (optional) | `bool` | Enables/disables menu item from being clicked on |
| `visible` (optional) | `bool` | if false, hides menu item |
| `sublabel` (optional) | `string` | Menu item sublabel |
| `accelerator` (optional) | `string` | Accelerator string eg `CmdOrCtrl+Z`, note: as of now will only insert string literal and will not parse for proper OS. See #23 |
| `icon` (optional) | `img` | The image shown to the left of the menu label |
| `checked` (optional) | `bool` | Should only be specified for checkbox or radio type menu items |
| `submenu` (optional) | `array : [MenuItems]` | Array of menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. |
| `before` (optional) | `string` | Inserts this item before the item with the specified id. If the referenced item doesn't exist the item will be inserted at the end of the menu |
| `after` (optional) | `string` | Inserts this item after the item with the specified id. If the referenced item doesn't exist the item will be inserted at the end of the menu |

## Unsupported electron menu item properties

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

See [Example Application](./example/README.md)

[main]: ./example/src/assets/Main.png "Main"