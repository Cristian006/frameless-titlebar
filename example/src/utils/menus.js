import { ipcRenderer, shell } from 'electron';

const { openExternal } = shell;

export const defaultTemplate = [
  {
    id: '1',
    label: 'App',
    submenu: [
      {
        id: 'hello',
        label: 'Disabled',
        enabled: true,
        after: '2',
        click: (item, win, e, menu) => {
          console.log(item, menu);
          let switchEnabled = menu.changeEnabledStateById(item.id, !item.enabled);
          console.log(switchEnabled)
        }
      },
      {
        id: '2',
        label: 'Sub Menu',
        icon: 'https://www.gstatic.com/images/branding/product/1x/keep_48dp.png',
        submenu: [
          {
            label: 'Color Submenu',
            submenu: [
              {
                label: 'Light',
                type: 'radio',
                checked: false,
                click: (item, win, e) => { document.querySelector('html').style.background = 'rgb(240,240,240)'; }
              },
              {
                label: 'Dark',
                type: 'radio',
                checked: true,
                click: (item, win, e) => { document.querySelector('html').style.background = 'rgb(64,64,64)'; }
              },
              {
                label: 'Black',
                type: 'radio',
                checked: false,
                click: (item, win, e) => { document.querySelector('html').style.background = 'rgb(0,0,0)'; }
              }
            ]
          },
          {
            label: 'Random 2',
            icon: require('../assets/images/icon.png')
          },
          {
            label: 'Random 3',
            submenu: [
              {
                label: 'Random 4',
                submenu: [
                  {
                    label: 'Random 7'
                  },
                  {
                    label: 'Random 8'
                  },
                  {
                    label: 'Random 9'
                  },
                  {
                    label: 'Random 10'
                  }
                ]
              },
              {
                label: 'Random 5'
              },
              {
                label: 'Random 6'
              }
            ]
          }
        ]
      },
      {
        id: '4',
        label: 'Not visible',
        visible: false
      },
      {
        id: '3',
        icon: require('../assets/images/icon.png'),
        label: 'Arguments',
        click: (item, win, e) => { console.log(item, win, e); }
      },
      {
        id: '5',
        label: 'Really Long Menu Label that should be truncated'
      },
      { type: 'separator' },
      {
        label: 'Test Accelerator',
        accelerator: 'CommandOrControl+Y',
        click: (item, win, e) => { ipcRenderer.send('Test'); }
      },
      {
        label: 'Open Dev Tools',
        click: (item, win, e) => { win.openDevTools(); }
      },
      {
        label: 'Resizable',
        type: 'checkbox',
        checked: true,
        click: (item, win, e) => { win.setResizable(item.checked); }
      },
      {
        label: 'Unchecked',
        type: 'checkbox',
        checked: false,
        click: (item, win, e) => { win.setResizable(item.checked); }
      },
      {
        label: 'Quit',
        click: () => { window.close(); }
      }
    ]
  },
  {
    id: '2',
    label: 'Color',
    before: '1',
    submenu: [
      {
        label: 'Light',
        type: 'radio',
        checked: false,
        click: (item, win, e) => { document.querySelector('html').style.background = 'rgb(240,240,240)'; }
      },
      {
        label: 'Dark',
        type: 'radio',
        checked: true,
        click: (item, win, e) => { document.querySelector('html').style.background = 'rgb(64,64,64)'; }
      },
      {
        label: 'Black',
        type: 'radio',
        checked: false,
        click: (item, win, e) => { document.querySelector('html').style.background = 'rgb(0,0,0)'; }
      }
    ]
  },
  {
    label: 'Disabled',
    enabled: false,
    submenu: [
      {
        label: 'Light',
        type: 'radio',
        checked: false,
        click: (item, win, e) => { document.querySelector('html').style.background = 'rgb(240,240,240)'; }
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Homepage',
        click: () => { openExternal('https://github.com/Cristian006/frameless-titlebar'); }
      }
    ]
  }
];

const Edit = [
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
    label: 'Delete'
  },
  {
    label: 'Select all',
    accelerator: 'Ctrl+A'
  }
];

export const githubTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New repository',
        accelerator: 'Ctrl+N'
      },
      {
        type: 'separator'
      },
      {
        label: 'Add local repository',
        accelerator: 'Ctrl+O'
      },
      {
        label: 'Clone repository',
        accelerator: 'Ctrl+Shift+O'
      },
      {
        type: 'separator'
      },
      {
        label: 'Options',
        accelerator: 'Ctrl+,'
      },
      {
        type: 'separator'
      },
      {
        label: 'Exit'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: Edit
  },
  {
    label: 'View',
    submenu: [
    ]
  },
  {
    label: 'Repository',
    submenu: [
    ]
  },
  {
    label: 'Branch',
    submenu: [

    ]
  },
  {
    label: 'Help',
    submenu: [

    ]
  }
];

export const signalTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Preferences...'
      },
      {
        type: 'separator'
      },
      {
        label: 'Exit'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: Edit
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Actual Size',
        accelerator: 'Ctrl+0'
      },
      {
        label: 'Zoom In',
        accelerator: 'Ctrl+Shift+='
      },
      {
        label: 'Zoom Out',
        accelerator: 'CtrlCtrl+-'
      },
      {
        type: 'separator'
      },
      {
        label: 'Toggle Full Screen',
        accelerator: 'F11'
      },
      {
        type: 'separator'
      },
      {
        label: 'Debug Log'
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Ctrl+Shift+I'
      }
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'Ctrl+M'
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Go to Release Notes'
      },
      {
        type: 'separator'
      },
      {
        label: 'Go to Forums'
      },
      {
        label: 'Report An Issue'
      },
      {
        type: 'separator'
      },
      {
        label: 'About Signal Desktop'
      }
    ]
  }
];

export const slackTemplate = [
  {
    label: 'File',
    accelerator: 'Ctrl+F',
    submenu: [
      {
        label: 'Preferences',
        accelerator: 'Ctrl+,'
      },
      {
        label: 'Close',
        accelerator: 'Ctrl+W'
      },
      {
        label: 'Quit Slack',
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
        label: 'Delete'
      },
      {
        label: 'Select all',
        accelerator: 'Ctrl+A'
      }
    ]
  },
  {
    label: 'View'
  },
  {
    label: 'History'
  },
  {
    label: 'Window'
  },
  {
    label: 'Help',
    accelerator: 'Ctrl+H'
  }
];
