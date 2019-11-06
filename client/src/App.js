import React from 'react'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { BrowserRouter, Route } from 'react-router-dom'

import { theme } from './themes/theme'

import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
