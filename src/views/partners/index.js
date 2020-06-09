import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import rotas from 'assets/rotas.png'
import cresca from 'assets/cresca.png'
import covid from 'assets/covid.png'
import { useReactGA } from 'utils/hooks'

import useStyles from './styles'

const partners = [
  {
    name: 'Cresça e apareça',
    image: cresca,
    link: 'http://crescaeapareca.com/sempre/',
  },
  {
    name: 'Rotas Solidárias',
    image: rotas,
    link: 'https://instagram.com/rotas.solidarias?igshid=342ib91j63fk',
  },
  {
    name: 'Covid solutions',
    image: covid,
    link: 'https://www.covidsolutions.com.br/',
  },
]

const Partners = () => {
  const styles = useStyles()

  useReactGA('parcerias')
  return (
    <Grid className={styles.flex}>
      {partners.map((partner) => (
        <Grid
          className={styles.item}
          key={partner.name}
          container
          alignItems="center"
          direction="column"
        >
          <img className={styles.coverImage} src={partner.image} alt="Imagem de capa do parceiro" />
          <Link color="secondary" href={partner.link}>
            <Typography className={styles.name} variant="h3">
              {partner.name}
            </Typography>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

export default React.memo(Partners)
