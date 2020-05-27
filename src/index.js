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
import WhoWeAre from 'views/who-we-are'
import SignIn from 'views/sign-in'
import Login from 'views/log-in'
import CreateSeller from 'views/create-seller'
import Product from 'views/product'

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
    textSecondary: {
      main: 'white',
    },
    custom: {
      pink: '#DC8474',
      blue: '#83B4BB',
      green: '#ADC26D',
      yellow: '#F6F193',
      red: '#ff0000',
    },
    background: {
      default: 'white',
    },
  },
  typography: {
    h1: {
      fontSize: '56px',
      fontWeight: 'bold',
      fontFamily: 'Oswald',
      lineHeight: 1.5,
    },
    h2: {
      fontSize: '24px',
      fontWeight: '500',
      fontFamily: 'Oswald',
      lineHeight: 1.5,
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
    backgroundImage:
      'url(https://uploaddeimagens.com.br/images/002/655/312/original/Desktop_-_1_%281%29.png?1589725718)',
    backgroundSize: 'cover',
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
    MuiSelect: {
      outlined: {
        borderColor: 'white',
        color: 'white',
      },
    },
    MuiTypography: {
      body1: {
        fontSize: '16px',
        lineHeight: '1.5',
      },
      colorTextSecondary: {
        color: 'white',
      },
    },
    MuiFormLabel: {
      focused: {
        borderColor: '1px solid white',
      },
      root: {
        // fontSize: '16px',
        color: 'white',
      },
    },
    MuiInputBase: {
      root: {
        color: 'white',
      },
      input: {
        fontSize: '16px',
        lineHeight: 'normal',
        borderColor: 'white',
        color: 'white',
      },
    },
    MuiOutlinedInput: {
      focused: {
        borderColor: 'white',
      },
      notchedOutline: {
        borderColor: 'white',
      },
    },
    MuiButton: {
      root: {
        height: '56px',
      },
      containedPrimary: {
        color: '#fff',
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
          <WhoWeAre path="/quem-somos" />
          <SignIn path="/cadastre-se" />
          <Login path="/login" />
          <CreateSeller path="/sobre-seu-negocio" />
          <Product path="/produto" />
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
