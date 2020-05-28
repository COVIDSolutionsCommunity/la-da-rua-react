import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import useStyles from './styles'

const ThankYou = () => {
  const styles = useStyles()

  return (
    <Grid item className={styles.header} container alignItems="center" direction="row">
      <Grid className={styles.section} item>
        <Grid item className={styles.sectionHeader}>
          <Typography color="primary" className={styles.title} component="h1" variant="h1">
            Obrigada pelo cadastro!
          </Typography>
          <Typography className={styles.text} color="primary" component="h2" variant="h2">
            Nós iremos analisar a sua loja, assim que ela for aceita. irá ser publicada no site!
            Obrigada pela confiança.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default React.memo(ThankYou)
