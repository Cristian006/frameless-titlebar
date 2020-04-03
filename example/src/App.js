import React, { useState } from 'react'
import TitleBar from 'frameless-titlebar'
import Dropdown from './components/dropdown'
import defaultMenu from './menu'

const App = () => {
  const [platform, setPlatform] = useState('win32')
  const [menuStyle, setMenuStyle] = useState('default')
  const [align, setAlign] = useState('center')

  const currentTheme = {
    menuStyle,
    platform,
    align
  }

  return (
    <div className='Container'>
      <TitleBar
        menu={defaultMenu}
        theme={{ ...currentTheme }}
        platform={platform}
        title='frameless-titlebar'
        onClose={() => { console.log('close clicked') }}
        onMinimize={() => { console.log('minimized clicked') }}
        onMaximize={() => { console.log('maximized clicked') }}
      />
      <div className='Content'>
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
      </div>
    </div>
  )
}

export default App
