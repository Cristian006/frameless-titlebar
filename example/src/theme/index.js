import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  primary: { main: '#3b6978' },
  secondary: { main: '#e84545' },
  background: {
    paper: '#cae8d5', // 84a9ac',
    default: '#cae8d5'
  }
}
const themeName = 'Oracle Cinnabar Duck'

export default createMuiTheme({ palette, themeName })
