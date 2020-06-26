import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from '@reach/router'

import useStyles from './styles'

const Welcome = () => {
  const styles = useStyles()

  return (
    <Grid item className={styles.header} container alignItems="center" direction="row">
      <Grid className={styles.section} item>
        <Grid item className={styles.sectionHeader}>
          <Typography color="primary" className={styles.title} component="h1" variant="h1">
            Bem-vindo novamente!
          </Typography>
          <Typography className={styles.text} color="primary" component="h2" variant="h2">
            Caso você queira realizar alterações no seu cadastro, clique em algum dos links abaixo
          </Typography>
          <Grid container direction="column">
            <Button
              variant="outlined"
              color="primary"
              className={styles.button}
              component={RouterLink}
              to="/sobre-voce"
            >
              Editar cadastro pessoal
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={styles.button}
              component={RouterLink}
              to="/sobre-seu-negocio"
            >
              Editar cadastro do seu negócio
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={styles.button}
              component={RouterLink}
              to="/produto"
            >
              Editar cadastro dos seus produtos
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default React.memo(Welcome)
