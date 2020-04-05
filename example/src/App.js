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
  makeStyles
} from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import TitleBar from 'frameless-titlebar'
import defaultMenu from './menu'

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
  }
]
const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: '12px',
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const App = ({ theme }) => {
  const [state, setState] = useState({
    platform: 'win32',
    menuStyle: 'default',
    align: 'center'
  })

  const currentTheme = {
    menu: {
      style: state.menuStyle,
      highlight: {
        background: theme.palette.secondary.main
      }
    },
    bar: {
      background: theme.palette.primary.dark,
      titleAlign: state.align,
      borderBottom: ''
    }
  }
  const classes = useStyles()
  const handleChange = (type) => (event) => {
    let { value } = event.target
    let newState = {}
    if (type === 'menuStyle') {
      newState['platform'] = 'win32'
      if (value === 'stacked') {
        newState['align'] = 'left'
      }
    }
    setState({ ...state, ...newState, [type]: value })
  }

  return (
    <div className='Container' style={{ background: theme.palette.background.default }}>
      <TitleBar
        menu={defaultMenu}
        theme={{ ...currentTheme }}
        platform={state.platform}
        title='frameless-titlebar'
        onClose={() => { console.log('close clicked') }}
        onMinimize={() => { console.log('minimized clicked') }}
        onMaximize={() => { console.log('maximized clicked') }}
      />
      <AppBar position='static'>
        <Toolbar >Frameless Titlebar</Toolbar>
      </AppBar>
      <div className='Content'>
        <Card variant='outlined'>
          <CardContent>
            <Typography>Title Bar Styles</Typography>
            {selections.map((item) => {
              return (
                <FormControl className={classes.formControl}>
                  <InputLabel id={`${item.option}-label`}>{item.label}</InputLabel>
                  <Select
                    key={`${item.option}-key`}
                    labelId={`${item.option}-label`}
                    id={item.option}
                    value={state[item.option]}
                    onChange={handleChange(item.option)}
                    variant='outlined'
                  >
                    {
                      item.options.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default withTheme(App)

/*

<div className='OptionContainer'>
          <div className='OptionLabel'>
            Platform
          </div>
          <Dropdown
            options={['win32', 'darwin', 'linux']}
            value={platform}
            onChange={setPlatform}
          />
        </div>
        <div className='OptionContainer'>
          <div className='OptionLabel'>
            Menu Style
          </div>
          <Dropdown
            options={['default', 'stacked', 'vertical']}
            value={menuStyle}
            onChange={(val) => {
              if (val === 'stacked') {
                setAlign('left')
              }
              setMenuStyle(val)
            }}
          />
        </div>
        <div className='OptionContainer'>
          <div className='OptionLabel'>
            Align Title
          </div>
          <Dropdown
            options={['center', 'left', 'right']}
            value={align}
            onChange={setAlign}
          />
        </div>
        */
