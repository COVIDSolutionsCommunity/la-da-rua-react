/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import StorefrontIcon from '@material-ui/icons/Storefront'
import Grid from '@material-ui/core/Grid'
import InstagramIcon from '@material-ui/icons/Instagram'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Link as RouterLink } from '@reach/router'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import PlaceIcon from '@material-ui/icons/Place'
import PropTypes from 'prop-types'

import placeholder from 'assets/comida.png'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    padding: '12px',
  },
  size: {
    height: '450px',
  },
  cover: {
    objectFit: 'contain',
  },
  name: {
    fontFamily: 'Oswald',
    textTransform: 'uppercase',
    fontSize: 18,
    color: theme.palette.secondary.main,
  },
  description: {
    color: theme.palette.secondary.main,
    fontFamily: 'Oswald',
    textTransform: 'uppercase',
    fontWeight: '100',
    marginBottom: '32px',
  },
  user: {
    color: theme.palette.secondary.main,
    fontFamily: 'Oswald',
    textTransform: 'uppercase',
    fontWeight: '500',
    marginLeft: '16px',
    fontSize: '18px',
  },
  loading: {
    position: 'absolute',
    top: 75,
    margin: 'auto 150px 0',
  },
  placeholder: {
    height: '140px',
    margin: '0 80px',
  },
  profile: {
    width: '50px',
    borderRadius: '50%',
    height: '50px',
  },
  margin: {
    borderTop: '1px solid #000000',
    paddingTop: 8,
  },
}))

const MainCard = ({ seller }) => {
  const styles = useStyles()
  const [isPictureLoading, setLoadingImage] = useState(true)

  const handleLoadingImage = useCallback((event) => {
    if (event.type === 'load') {
      setLoadingImage(false)
    }
  }, [])

  return (
    <Card className={styles.root}>
      <CardActionArea className={styles.size} component={RouterLink} to={`/loja/${seller.slug}`}>
        {seller.coverImage ? (
          <CardMedia
            component="img"
            alt="Foto da marca"
            height="290"
            image={seller.coverImage}
            onLoad={handleLoadingImage}
            className={styles.cover}
          />
        ) : (
          <img alt="Foto da marca" src={placeholder} className={styles.placeholder} />
        )}
        {seller.coverImage && isPictureLoading && (
          <CircularProgress color="secondary" className={styles.loading} />
        )}
        <CardContent>
          <Grid container spacing={1}>
            <Grid container item direction="row" justify="flex-start" alignItems="center">
              <Typography className={styles.name} variant="h5" component="h2">
                {seller.name}
              </Typography>
            </Grid>
            {seller.description && (
              <Grid
                container
                item
                direction="row"
                justify="flex-start"
                alignItems="center"
                className={styles.obs}
              >
                <Typography className={styles.description} variant="h5" component="h2">
                  {seller.user.description}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>
      <Grid container alignItems="center" className={styles.margin}>
        <img alt="Foto da marca" src={seller.user.profileImage} className={styles.profile} />
        <Typography className={styles.user} variant="h5" component="h2">
          {seller.user.firstName} {seller.user.lastName}
        </Typography>
      </Grid>
    </Card>
  )
}

MainCard.propTypes = {
  seller: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
    }).isRequired,
    coverImage: PropTypes.string.isRequired,
  }).isRequired,
}

export default React.memo(MainCard)
