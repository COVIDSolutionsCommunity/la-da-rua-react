import React from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from '@reach/router'
import PropTypes from 'prop-types'
import logo from 'assets/logo_header.png'

import useStyles from './styles'

const App = ({ children }) => {
  const styles = useStyles()

  return (
    <Grid container className={styles.container}>
      <AppBar color="secondary" position="fixed" className={styles.header}>
        <Toolbar>
          <RouterLink to="/">
            <img alt="Logo" src={logo} />
          </RouterLink>
          <Grid
            direction="row"
            justify="flex-end"
            container
          >
            <Link component={RouterLink} className={styles.link} to="/">
              Início
            </Link>
            <Link component={RouterLink} className={styles.link} to="/">
              Quem somos
            </Link>
            <Link component={RouterLink} className={styles.link} to="/">
              Parcerias
            </Link>
            <Link component={RouterLink} className={styles.link} to="/">
              Cadastre-se
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid className={styles.content}>
        {children}
      </Grid>
    </Grid>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(App)
