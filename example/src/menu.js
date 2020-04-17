import { useEffect, useState } from 'react'

const enqueue = (queueSnack) => (item, currentWindow, e) => {
  var label = `Item Clicked: ${item.label}!`
  var variant = 'info'
  if (item.type === 'radio') {
    label = `Radio Selected: ${item.label}!`
    variant = 'success'
  } else if (item.type === 'checkbox') {
    label = `${item.checked ? 'Checked' : 'Unchecked'} Item: ${item.label}!`
    variant = item.checked ? 'success' : 'error'
  }
  queueSnack(label, { variant })
}

const createMenu = (queueSnack) => {
  const click = enqueue(queueSnack)
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Frameless Titlebar',
          accelerator: 'v2.0.0',
          disabled: true,
          click
        },
        {
          label: 'New Window',
          click
        },
        {
          label: 'Preferences',
          click
        },
        {
          type: 'separator',
          click
        },
        {
          label: 'Resizeable',
          checked: true,
          type: 'checkbox',
          click
        },
        {
          label: 'Quit Application',
          accelerator: 'Ctrl+Q',
          click
        }
      ]
    },
    {
      label: 'Radios',
      submenu: [
        {
          label: 'Option 1',
          type: 'radio',
          click
        },
        {
          label: 'Option 2',
          type: 'radio',
          click
        },
        {
          label: 'Option 3',
          type: 'radio',
          click
        },
        {
          label: 'Option 4',
          type: 'radio',
          click
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Ctrl+Z',
          click
        },
        {
          label: 'Redo',
          accelerator: 'Ctrl+Y',
          click
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'Ctrl+X',
          click
        },
        {
          label: 'Copy',
          accelerator: 'Ctrl+C',
          click
        },
        {
          label: 'Paste',
          accelerator: 'Ctrl+V',
          click
        },
        {
          label: 'Paste and Match Style',
          accelerator: 'Ctrl+Shift+V',
          click
        },
        {
          label: 'Seleect All',
          accelerator: 'Ctrl+A',
          click
        }
      ]
    },
    {
      label: 'View Long Label Truncation',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'F11',
          click
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Ctrl+Shift+I',
          click
        }
      ]
    },
    {
      label: 'Test',
      submenu: [
        {
          label: 'Test One',
          click
        },
        {
          label: 'Lorem Ipsum cupcake ipsum dolor sit amet. Pastry jelly-o chupa chups. Sweet chocolate pie jujubes bear claw. Chocolate cake danish tootsie roll bonbon jelly tiramisu cookie fruitcake.',
          accelerator: 'Alt+7',
          click
        },
        {
          label: 'Test Three',
          submenu: [
            {
              label: 'Depth 2',
              submenu: [
                {
                  label: 'Depth 3',
                  click
                },
                {
                  label: 'Test Five',
                  click
                }
              ]
            },
            {
              label: 'Test Six',
              click
            },
            {
              label: 'Test Seven',
              click
            }
          ]
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Home Page',
          click
        },
        {
          label: 'Report an Issue',
          click
        },
        {
          label: 'About Frameless Titlebar',
          click
        }
      ]
    },
    {
      label: 'Random',
      disabled: true,
      subemnu: [
        {
          label: 'Single Item',
          click
        }
      ]
    },
    {
      label: 'Overflow',
      submenu: [
        {
          label: 'Random 1',
          click
        }
      ]
    },
    {
      label: 'Random 2',
      submenu: [
        {
          label: 'Random 3',
          click
        },
        {
          label: 'Random 4',
          click
        }
      ]
    }
  ]
}

export const useMenu = (dispatch) => {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    setMenu(createMenu(dispatch))
  }, [dispatch])

  return menu
}
