import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import food from 'assets/comida.png'
import colagem from 'assets/colagem_logo.png'
import logo from 'assets/logo_principal.png'
import decoration from 'assets/decoracao.png'
import dress from 'assets/vestimenta.png'
import variaties from 'assets/variedades.png'

import useStyles from './styles'
import SectionButton from './section-button'

const sectionButtons = [
  {
    name: 'comida',
    img: food,
    color: 'pink',
  },
  {
    name: 'vestimenta',
    img: dress,
    color: 'blue',
  },
  {
    name: 'decoração',
    img: decoration,
    color: 'green',
  },
  {
    name: 'variedades',
    img: variaties,
    color: 'yellow',
  },
]

const LandingPage = () => {
  const styles = useStyles()

  return (
    <Grid className={styles.container}>
      <Grid container justify="center" alignItems="flex-end">
        <img className={styles.logo} alt="logo" src={colagem} />
        <Grid xs={4} alignItems="center" container>
          <img alt="Lá da rua" src={logo} />
          <Typography className={styles.title} component="h1" variant="h2">
            Microempreendedores da minha, da sua e das nossas ruas
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        {sectionButtons.map(section => <SectionButton key={section.label} label={section.name} color={section.color} img={section.img} />)}
      </Grid>
    </Grid>
  )
}

export default React.memo(LandingPage)
