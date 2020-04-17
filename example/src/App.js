import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  IconButton,
  makeStyles,
  Tooltip,
  Switch,
  Divider
} from '@material-ui/core'
import {
  Brightness7,
  Brightness4,
  GitHub
} from '@material-ui/icons'
import { withTheme } from '@material-ui/core/styles'
import TitleBar from 'frameless-titlebar'
import { useMenu } from './menu'
import { useSnackbar } from 'notistack'
import Notification from './components/notification';

const homepage = 'https://github.com/Cristian006/frameless-titlebar'
const selections = [
  {
    option: 'platform',
    label: 'Platform Type',
    options: ['win32', 'darwin', 'linux']
  },
  {
    option: 'menuStyle',
    label: 'Menu Style',
    options: ['default', 'stacked', 'vertical']
  },
  {
    option: 'align',
    label: 'Title Align',
    options: ['center', 'left', 'right']
  },
  {
    type: 'divider',
  },
  {
    option: 'showTitle',
    label: 'Show Title',
    type: 'toggle'
  },
  {
    option: 'showIcon',
    label: 'Show Logo Icon',
    type: 'toggle'
  },
  {
    option: 'subLabels',
    label: 'Show Sub Menu Labels',
    type: 'toggle'
  },
  {
    option: 'showCustom',
    label: 'Show Custom Titlebar Button',
    type: 'toggle'
  },
]

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: '12px',
    width: '100%'
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    color: '#fff'
  }
}))

const App = ({ theme, setPalette }) => {
  const [state, setState] = useState({
    platform: 'win32',
    menuStyle: 'default',
    align: 'center',
    subLabels: true,
    showIcon: true,
    showTitle: true,
    showCustom: true
  })

  const currentTheme = {
    menu: {
      palette: theme.palette.type,
      style: state.menuStyle,
      header: {
        show: state.subLabels,
      },
      list: {
        background: theme.palette.background.default
      },
      item: {
        active: {
          background: theme.palette.secondary.light
        }
      }
    },
    bar: {
      palette: 'dark',
      background: theme.palette.primary.dark,
      borderBottom: '',
      icon: {
        width: 18,
        height: 18
      },
      button: {
        active: {
          color: theme.palette.type === 'dark' ? '#fff' : '#000',
          background: theme.palette.background.default
        }
      },
      title: {
        align: state.align
      }
    }
  }


  const classes = useStyles()
  const handleChange = (option, type) => (event) => {
    let value;
    switch (type) {
      case 'toggle':
        value = !state[option];
        break;
      default:
        value = event.target.value;
        break;
    }
    setState({ ...state, [option]: value })
  }

  const togglePalette = () => {
    setPalette(theme.palette.type === 'dark' ? 'light' : 'dark')
  }

  const codeStyle = { border: `1px solid ${theme.palette.secondary.main}` }
  const { enqueueSnackbar } = useSnackbar()
  const defaultMenu = useMenu(enqueueSnackbar)
  return (
    <div className='Container' style={{ background: theme.palette.background.default }}>
      <TitleBar
        menu={defaultMenu}
        theme={{ ...currentTheme }}
        icon={state.showIcon && (
          <div style={{
            borderRadius: '50%',
            background: theme.palette.secondary.light,
            height: '100%',
            color: theme.palette.primary.dark,
            fontWeight: 'bolder',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            fontSize: 10
          }}>
            FT
          </div>
        )}
        platform={state.platform}
        title={state.showTitle && 'example-app'}
        onClose={() => { enqueueSnackbar('close clicked', { variant: 'error' }) }}
        onMinimize={() => { enqueueSnackbar('minimized clicked', { variant: 'success' }) }}
        onMaximize={() => { enqueueSnackbar('maximized clicked', { variant: 'success' }) }}
        onDoubleClick={() => { enqueueSnackbar('double clicked', { variant: 'success' }) }}
      >
        {state.showCustom && (
          <Notification onNotificationClick={(idx) => enqueueSnackbar(`Notification Item ${idx} Clicked!`, { variant: 'info' })} />
        )}
      </TitleBar>
      <AppBar position='static'>
        <Toolbar className={classes.appBar} >
          <Typography variant='h6' className={classes.title}>
            Frameless Titlebar
            <Typography style={{ marginLeft: 12, fontWeight: 'bolder' }} component='span' variant='h6' color='secondary'>
              v2.1.3 <span role='img'>🥳</span>
            </Typography>
          </Typography>
          <Tooltip title='Toggle Dark/Light Mode' >
            <IconButton onClick={togglePalette} color='inherit'>
              {theme.palette.type === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <Tooltip title='⭐ me on GitHub 🙏' >
            <IconButton onClick={() => window.open(homepage, '_blank')} color='inherit'>
              <GitHub />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <div className='Scroll'>
        <div className='Content'>
          <Card variant='outlined'>
            <CardContent>
              <Typography><span role='img'>💅</span> Title Bar Styles</Typography>
              <Typography variant='body1'>
                Just a few of the styling options for the titlebar.
              </Typography>
              {selections.map((item) => {

                switch (item.type) {
                  case 'toggle': {
                    return (
                      <FormControl key={`${item.option}-key`} style={{ display: 'block' }}>
                        <FormControlLabel
                          style={{ padding: 0, margin: 0 }}
                          control={<Switch
                            checked={state[item.option]}
                            onChange={handleChange(item.option, item.type)}
                            color="secondary"
                          />}
                          label={item.label}
                          labelPlacement="start"
                        />
                      </FormControl>
                    )
                  }
                  case 'divider': {
                    return <Divider style={{ margin: '24px 0px 12px 0px' }} />
                  }
                  default: {
                    return (
                      <FormControl key={`${item.option}-key`} className={classes.formControl}>
                        <InputLabel color='secondary' id={`${item.option}-label`}>{item.label}</InputLabel>
                        <Select
                          labelId={`${item.option}-label`}
                          id={item.option}
                          value={state[item.option]}
                          onChange={handleChange(item.option, item.type)}
                          variant='outlined'
                          color='secondary'
                        >
                          {
                            item.options.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                    )
                  }
                }
              })}
            </CardContent>
          </Card>
          <Card variant='outlined' style={{ marginTop: 12 }}>
            <CardContent>
              <Typography variant='h6'><span role='img'>⌨️</span> Keyboard accessibility</Typography>
              <Typography variant='body1'>
                When pressing <code style={codeStyle}>Alt</code> + the first character of any of the menus in the title bar it will automatically open that menu item for you.
                <br />
                Hit <code style={codeStyle}>Alt</code> + <code style={codeStyle}>F</code> {`‼️`}
              </Typography>
              <Divider style={{ margin: '12px 0px' }} />
              <Typography variant='h6'> Use the arrow Keys</Typography>
              <Typography variant='body1'>
                Navigate the Menus and Submenus with the arrow keys! <span role='img'>◀️🔼▶️🔽</span>
              </Typography>
            </CardContent>
          </Card>
          <Card variant='outlined' style={{ marginTop: 12 }}>
            <CardContent>
              <Typography variant='h6'>🖥️ Resize the Window</Typography>
              <Typography variant='body1'>
                When the menu buttons don't fit on the titlebar they will be moved into an overflow menu.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default withTheme(App)
