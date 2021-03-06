import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import ReactGA from 'react-ga'

import { GOOGLE_ANALYTICS } from 'utils/environment'
import food from 'assets/comida.png'
import colagem from 'assets/colagem_logo.png'
import logo from 'assets/logo_principal.png'
import decoration from 'assets/services.png'
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
    name: 'serviços',
    img: decoration,
    color: 'purple',
  },
  {
    name: 'variedades',
    img: variaties,
    color: 'yellow',
  },
]

const LandingPage = () => {
  const styles = useStyles()

  useEffect(() => {
    ReactGA.initialize(GOOGLE_ANALYTICS)
    ReactGA.pageview('/')
  }, [])

  return (
    <Grid item container alignItems="center" justify="center" className={styles.container}>
      <Grid item container justify="center" alignItems="center">
        <img className={styles.logo} alt="logo" src={colagem} />
        <img alt="Lá da rua" src={logo} className={styles.mainLogo} />
      </Grid>
      <Grid item className={styles.link}>
        {sectionButtons.map((section) => (
          <SectionButton
            key={section.label}
            label={section.name}
            color={section.color}
            img={section.img}
          />
        ))}
      </Grid>
    </Grid>
  )
}

export default React.memo(LandingPage)
