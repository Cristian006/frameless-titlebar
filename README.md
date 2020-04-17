# frameless-titlebar

[![NPM](https://img.shields.io/npm/v/frameless-titlebar.svg)](https://www.npmjs.com/package/frameless-titlebar) ![Build and Deploy](https://github.com/Cristian006/frameless-titlebar/workflows/Build%20and%20Deploy/badge.svg) ![NPM](https://img.shields.io/npm/l/frameless-titlebar)

> Customizable titlebar for frameless electron windows built with React

![Main][main]

## [Demo App](https://cristian006.github.io/frameless-titlebar)

The demo application can be found in the [example](./example) folder along with more images of the different titlebar styles:

* [Overflow Menu](./example/public/overflow.jpg): When menu buttons don't fit in the given titlebar space items are moved into an overflowed submenu.
* [Stacked Menu](./example/public/stacked.png): Titlebar stacked above menu bar.
* [Vertical Menu](./example/public/vertical.png): All menu items moved into a vertical submenu.

## Install

```bash
npm install --save frameless-titlebar
# or
yarn add frameless-titlebar
```

## Usage

Electron Browser SetUp

```js
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

React App SetUp

```jsx
import React from 'react'
import icon from 'path/to/icon.png';
import menu from 'path/to/menu';
import { remote } from 'electron';

import TitleBar from 'frameless-titlebar'

const currentWindow = remote.getCurrentWindow();

const Example = () => {
  return (
    <div>
      <TitleBar
        iconSrc={icon} // app icon
        currentWindow={currentWindow} // electron window instance
        platform={process.platform} // win32, darwin, linux
        menu={menu}
        theme={{
          // any theme overrides specific
          // to your application :)
        }}
        title="frameless app"
        onClose={() => currentWindow.close()}
        onMinimize={() => currentWindow.minimize()}
        onMaximize={() => currentWindow.maximize()}
        // when the titlebar is double clicked
        onDoubleClick={() => currentWindow.maximize()}
      >
        {/* custom titlebar items */}
      </TitleBar>
    </div>
  )
}
```

> Example of all of the overridable theme properties can be found in the example folder [here](./example/README.md)

Use titlebar theme in children

```jsx
import { useContext } from 'react';
import { TitlebarThemeContext } from 'frameless-titlebar';

const CustomItem = () => {
  // access all of the current theme properties in this
  // child component
  const theme = useContext(TitlebarThemeContext);
  return (
    <div style={{ height: theme.bar.height }}>
      {/* ... */}
    </div>
  )
}

const App = () => {
  return (
    <div>
      <TitleBar>
        <CustomItem>
      </TitleBar>
    </div>
  )
}

```

> Example of a custom TitleBarButton can be seen [here](./example/src/components.js)

## Supported Menu Item Properties

Supported menu item properties from:
[Electron Menu Object/Template Documentation](https://electronjs.org/docs/api/menu "Electron Menu Documentation")

| Name | Type | Description |
| :--- | :--: | :---------- |
| `id` (optional) | `string` | Must be unique. If defined then it can be used as a reference to this item by the position attribute |
| `type` (optional) | oneOf([`normal`, `separator`, `submenu`, `checkbox`, `radio`]) | Type of supported menu items |
| `label` (optional) | `string` | Menu item label |
| `click` (optional) | `function(menuItem, browserWindow, event)` | if `currentWindow` is not passed in to the titlebar then, `browserWindow` will be null |
| `disabled` (optional) | `bool` | Enables/disables menu item from being clicked on |
| `accelerator` (optional) | `string` | Accelerator string eg `CmdOrCtrl+Z`|
| `icon` (optional) | `img` | The image shown to the left of the menu label |
| `checked` (optional) | `bool` | Should only be specified for checkbox or radio type menu items |
| `submenu` (optional) | `array : [MenuItems]` | Array of menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. |
| `before` (optional) | `string` | Inserts this item before the item with the specified id. If the referenced item doesn't exist the item will be inserted at the end of the menu |
| `after` (optional) | `string` | Inserts this item after the item with the specified id. If the referenced item doesn't exist the item will be inserted at the end of the menu |

## Keyboard accessibility

**Opening Menu**: Pressing `Alt` Key + First letter of any of the visible menu items. eg: `Alt+F` would open the first menu item with an `F` if any, such as `File`.

**Closing Menu**: Pressing `Esc`.

**Navigating Submenus**: Use arrow keys (up, down, left, right) to navigate menus once they're open.

## Disclaimers

**NOTE**: `^v2.0.0` has a lot of breaking changes from the previous `^1.x.x` releases since this was a complete re-write of frameless-titlebar

## Contributing

Feel free to fork and create pull requests! I'll try my best to review any code changes for the next release.

## Links

[Electron Remote Docs](https://www.electronjs.org/docs/api/remote#remotegetcurrentwindow)

[Electron Menu Docs](https://electronjs.org/docs/api/menu "Electron Menu Documentation")

## License

MIT © [Cristian006](https://github.com/Cristian006)

---

<div style="text-align: center">
Made with ❤️ + ☕ by <a href="http://crispcrafts.com">Cristian Ponce</a>
</div>

[main]: ./example/public/default.png "Main"
