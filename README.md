# frameless-titlebar

> Customizable titlebar for frameless electron windows built with React

[![NPM](https://img.shields.io/npm/v/frameless-titlebar.svg)](https://www.npmjs.com/package/frameless-titlebar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## [Demo App](https://cristian006.github.io/frameless-titlebar)

The demo application can be found in the `/example` folder.


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

import TitleBar from 'frameless-titlebar'

const Example = () => {
  return (
    <div>
      <TitleBar
        icon={icon}
        platform={process.platform}
        theme={{
          // any theme overrides specific
          // to your application :)
        }}
        title="frameless app"
      />
    </div>
  )
}
```

## License

MIT © [Cristian006](https://github.com/Cristian006)

---
