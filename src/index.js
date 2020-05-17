import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import './index.css'
import { Router } from '@reach/router'

import rootReducer from 'modules/reducers'
import App from 'views/app'
import LandingPage from 'views/landing'

import * as serviceWorker from './serviceWorker'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, promiseMiddleware, logger))
)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#222',
    },
    custom: {
      pink: '#DC8474',
      blue: '#83B4BB',
      green: '#ADC26D',
      yellow: '#F6F193',
    },
    background: {
      default: 'white',
    },
  },
  typography: {
    h1: {
      fontSize: '32px',
      fontWeight: 'bold',
      fontFamily: 'Oswald',
    },
    h2: {
      fontSize: '20px',
      fontWeight: '500',
      fontFamily: 'Oswald',
    },
    h3: {
      fontSize: '14px',
      lineHeight: '1.5',
      textAlign: 'justify',
    },
    h4: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '1.33',
      color: '#BA6D45',
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: '1.5',
    },
  },
  root: {
    backgroundColor: 'white',
    fontFamily: 'Oswald',
    button: {
      textTransform: 'capitalize',
    },
    input: {
      fontSize: '16px',
      appearance: 'none',
    },
  },
  overrides: {
    MuiDialogTitle: {
      root: {
        fontSize: '2px',
      },
    },
    MuiSvgIcon: {
      root: {
        height: '20px',
        width: '20px',
      },
    },
    MuiTypography: {
      body1: {
        fontSize: '16px',
        lineHeight: '1.5',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '16px',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '16px',
        lineHeight: 'normal',
      },
    },
    MuiButton: {
      containedPrimary: {
        color: 'white',
      },
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App path="/">
          <LandingPage path="/" />
        </App>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
