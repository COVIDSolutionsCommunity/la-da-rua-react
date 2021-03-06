import React, { useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from '@reach/router'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import ReactGA from 'react-ga'

import { useResizer } from 'utils/hooks'
import logo from 'assets/logo_header.png'
import logo2 from 'assets/colagem_logo.png'
import footer from 'assets/rodape.png'
import { isLoggedIn } from 'modules/user/selectors'
import { logout } from 'modules/user/actions'
import { GOOGLE_ANALYTICS } from 'utils/environment'

import useStyles from './styles'

const App = ({ children }) => {
  const styles = useStyles()
  const isMobile = useResizer()
  const dispatch = useDispatch()
  const isLogged = useSelector(isLoggedIn)

  const onLogoutClick = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  useEffect(() => {
    ReactGA.initialize(GOOGLE_ANALYTICS)
    ReactGA.pageview('/')
  }, [])

  return (
    <Grid container className={styles.container}>
      <AppBar color="secondary" position="static" className={styles.header}>
        <Toolbar>
          <RouterLink to="/">
            {!isMobile ? (
              <img className={styles.logo} alt="Logo" src={logo} />
            ) : (
              <img className={styles.logo2} alt="Logo" src={logo2} />
            )}
          </RouterLink>
          <Grid direction="row" justify="flex-end" container>
            {!isMobile && (
              <Button component={RouterLink} className={classnames(styles.link)} to="/">
                Início
              </Button>
            )}
            <Button component={RouterLink} className={styles.link} to="/quem-somos">
              {isMobile ? 'nós' : 'quem somos'}
            </Button>
            <Button component={RouterLink} className={styles.link} to="/apoie-o-projeto">
              Apoie {!isMobile && 'o projeto'}
            </Button>
            {isLogged ? (
              <Button component={RouterLink} className={styles.link} to="/bem-vindo">
                Minha loja
              </Button>
            ) : (
              <Button component={RouterLink} className={styles.link} to="/parcerias">
                Parcerias
              </Button>
            )}
            {isLogged ? (
              <Button component={Link} className={styles.link} onClick={onLogoutClick}>
                LOG OUT
              </Button>
            ) : (
              <Button component={RouterLink} className={styles.link} to="/login">
                LOGIN
              </Button>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container item justify="center" className={styles.content}>
        {children}
      </Grid>
      <Grid item container justify="center" className={styles.footer}>
        <img className={styles.img} alt="Rodapé" src={footer} />
      </Grid>
    </Grid>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(App)
