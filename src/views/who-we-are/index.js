import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useResizer } from 'utils/hooks'
import whoWeAre from 'assets/quem_somos.png'

import useStyles from './styles'

const WhoWeAre = () => {
  const styles = useStyles()
  const isMobile = useResizer()

  return (
    <Grid
      container
      alignItems="center"
      direction={isMobile ? 'column' : 'row'}
      justify={isMobile && 'center'}
    >
      <Grid className={styles.section} item xs={isMobile ? 12 : 6}>
        <Typography color="primary" component="h1" variant="h1">
          QUEM SOMOS
        </Typography>
        <Typography className={styles.text} color="primary" component="h2" variant="h2">
          Somos uma rede que visa alavancar a economia local e praticar a solidariedade em
          Fortaleza, Ceará. Nosso objetivo é valorizar o trabalho dos microempreendedores e
          estreitar suas as relações com os clientes, enquanto fazemos o bem oferecendo alternativas
          para viabilizar doações para pessoas em vulnerabilidade social.
        </Typography>
      </Grid>
      <Grid item xs={isMobile ? 12 : 6}>
        <img
          alt="Colagem com uma pessoa entregando uma caixa"
          className={styles.img}
          src={whoWeAre}
        />
      </Grid>
    </Grid>
  )
}

export default React.memo(WhoWeAre)
