import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  type: 'dark',
  primary: { main: '#34495d' },
  secondary: { main: '#ee7738' }
}
const themeName = 'Oracle Cinnabar Duck'

export const changePalette = (type) => {
  return createMuiTheme({ palette: { ...palette, type }, themeName })
}

export default createMuiTheme({ palette, themeName })
