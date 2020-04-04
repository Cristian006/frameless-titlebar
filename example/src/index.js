import React from 'react'
import ReactDOM from 'react-dom'
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles'

import './index.css'
import App from './App'

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
