import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'

import { useResizer } from 'utils/hooks'

import useStyles from './styles'

const StyledButton = withStyles({
  root: {
    background: 'yellow',
    height: 48,
    padding: '0 30px',
  },
  label: {
    fontFamily: 'Oswald',
    fontSize: 16,
    fontWeight: 500,
  },
})(Button)

const SupportUs = () => {
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
          APOIE O PROJETO
        </Typography>
        <Typography className={styles.text} color="primary" component="h2" variant="h2">
          Você tem interesse em ajudar o LádaRua a promover o desenvolvimento de microempreendedores
          locais e ajudar pessoas em vulnerabilidade social? Se a resposta para a pergunta acima foi
          “sim”, saiba que uma das formas é realizando uma doação, no valor que desejar:
        </Typography>
      </Grid>
      <Grid item>
        <StyledButton
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<FavoriteBorderIcon />}
          className={styles.button}
          component={Link}
          href="https://apoia.se/ladarua"
          // onClick={handleClose}
        >
          CLIQUE AQUI PARA DOAR
        </StyledButton>
      </Grid>
    </Grid>
  )
}

export default React.memo(SupportUs)
