import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import './index.css'
import { Router } from '@reach/router'
import * as Sentry from '@sentry/react'

import SupportUs from 'views/support-us'
import rootReducer from 'modules/reducers'
import App from 'views/app'
import LandingPage from 'views/landing'
import WhoWeAre from 'views/who-we-are'
import SignIn from 'views/sign-in'
import Login from 'views/log-in'
import CreateSeller from 'views/create-seller'
import Product from 'views/product'
import ThankYou from 'views/thank-you'
import Category from 'views/category'
import Seller from 'views/seller'
import SellerProduct from 'views/seller-product'
import Partners from 'views/partners'
import Welcome from 'views/welcome'
import AboutYou from 'views/about-you'

import * as serviceWorker from './serviceWorker'

Sentry.init({ dsn: 'https://f083b25b9f144c3483ab04389b5fab78@o418462.ingest.sentry.io/5321420' })

const errorMiddleware = () => {
  return (next) => (action) => {
    const result = next(action)

    if (!(result instanceof Promise)) {
      return action
    }

    return result.catch(() => {})
  }
}
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...[thunk, errorMiddleware, promise], logger))
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
      yellow: '#FFC720',
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
      fontSize: '24px',
      lineHeight: '1.5',
      textAlign: 'justify',
      fontFamily: 'Oswald',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    h4: {
      fontSize: '20px',
      lineHeight: '1.5',
      textAlign: 'justify',
      fontFamily: 'Oswald',
      fontWeight: '100',
      textTransform: 'uppercase',
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
      root: {
        '&$focused': {
          borderColor: '1px solid white',
        },
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
      root: {
        '&$focused': {
          borderColor: '1px solid white',
        },
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
          <Welcome path="/bem-vindo" />
          <CreateSeller path="/sobre-seu-negocio" />
          <CreateSeller path="/cadastre-seu-negocio" />
          <Product path="/produto" />
          <ThankYou path="/obrigada" />
          <SupportUs path="/apoie-o-projeto" />
          <Partners path="/parcerias" />
          <Category path="/:category" />
          <Seller path="/loja/:slug" />
          <SellerProduct path="/loja/:slug/:id" />
          <AboutYou path="/sobre-voce" />
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
