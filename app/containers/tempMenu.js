import { shell, ipcRenderer } from 'electron';

const { openExternal } = shell;

const template = [
  {
    label: 'App',
    submenu: [
      {
        label: 'Disabled',
        enabled: false,
      },
      {
        label: 'Sub Menu',
        submenu: [
          {
            label: 'Random 1',
          },
          {
            label: 'Random 2',
          },
          {
            label: 'Random 3',
            submenu: [
              {
                label: 'Random 4',
                submenu: [
                  {
                    label: 'Random 7',
                  },
                  {
                    label: 'Random 8',
                  },
                  {
                    label: 'Random 9',
                  },
                  {
                    label: 'Random 10',
                  }
                ],
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
        label: 'Not visible',
        visible: false,
      },
      {
        label: 'Arguments',
        click: (item, win, e) => console.log(item, win, e),
      },
      {
        label: 'Really Long Menu Label that should be truncated',
      },
      { type: 'separator' },
      {
        label: 'Test Accelerator',
        accelerator: 'CommandOrControl+Y',
        click: (item, win, e) => {
          ipcRenderer.send('Test');
        },
      },
      {
        label: 'Open Dev Tools',
        click: (item, win, e) => {
          win.openDevTools();
        },
      },
      {
        label: 'Resizable',
        type: 'checkbox',
        checked: true,
        click: (item, win, e) => win.setResizable(item.checked),
      },
      {
        label: 'Quit',
        click: () => {
          window.close();
        },
      },
    ],
  },
  {
    label: 'Color',
    submenu: [
      {
        label: 'Light',
        type: 'radio',
        checked: false,
        click: (item, win, e) => document.querySelector('html').style.background = 'rgb(240,240,240)',
      },
      {
        label: 'Dark',
        type: 'radio',
        checked: true,
        click: (item, win, e) => document.querySelector('html').style.background = 'rgb(64,64,64)',
      },
      {
        label: 'Black',
        type: 'radio',
        checked: false,
        click: (item, win, e) => document.querySelector('html').style.background = 'rgb(0,0,0)',
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Homepage',
        click: () => {
          openExternal('https://github.com/KochiyaOcean/electron-react-titlebar')
        },
      },
    ],
  },
];

export default template;
