import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import mao from 'assets/logo_uma_mao.jpg'
import rotas from 'assets/rotas.png'
import cresca from 'assets/cresca.png'
import covid from 'assets/covid.png'
import unijus from 'assets/unijus_logo.png'
import epro from 'assets/logo_epro.png'
import agendaki from 'assets/agendaki.png'
import sos from 'assets/sos.png'
import recomecando from 'assets/recomecando.png'
import { useReactGA } from 'utils/hooks'

import useStyles from './styles'

const partners = [
  {
    name: 'Cresça e apareça',
    image: cresca,
    link: 'https://www.instagram.com/programacrescaeapareca/?hl=pt-br',
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
  {
    name: 'UNIJUS',
    image: unijus,
    link: ' https://unijusjr.com.br/',
  },
  {
    name: 'EPRO',
    image: epro,
    link: 'https://eproconsultoria.com.br/',
  },
  {
    name: 'Agendaki',
    image: agendaki,
    link: 'http://agendakibr.com.br/',
  },
  {
    name: 'SOS Encurralado',
    image: sos,
    link: 'https://www.sosencurralados.com.br/',
  },
  {
    name: 'Re_começando 2020',
    image: recomecando,
    link: 'https://www.instagram.com/re_comecando2020/',
  },
  {
    name: 'Uma mão',
    image: mao,
    link: 'https://www.instagram.com/_umamao/',
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
          component="a"
          href={partner.link}
          target="_blank"
        >
          <img className={styles.coverImage} src={partner.image} alt="Imagem de capa do parceiro" />
          <Typography color="secondary" className={styles.name} variant="h3">
            {partner.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}

export default React.memo(Partners)
