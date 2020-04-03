const defaultMenu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Frameless Titlebar',
        accelerator: 'v2.0.0',
        disabled: true
      },
      {
        label: 'New Window'
      },
      {
        label: 'Preferences'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit Application',
        accelerator: 'Ctrl+Q'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'Ctrl+Z'
      },
      {
        label: 'Redo',
        accelerator: 'Ctrl+Y'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'Ctrl+X'
      },
      {
        label: 'Copy',
        accelerator: 'Ctrl+C'
      },
      {
        label: 'Paste',
        accelerator: 'Ctrl+V'
      },
      {
        label: 'Paste and Match Style',
        accelerator: 'Ctrl+Shift+V'
      },
      {
        label: 'Seleect All',
        accelerator: 'Ctrl+A'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Full Screen',
        accelerator: 'F11'
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Ctrl+Shift+I'
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Home Page'
      },
      {
        label: 'Report an Issue'
      },
      {
        label: 'About Frameless Titlebar'
      }
    ]
  }
]

export default defaultMenu
