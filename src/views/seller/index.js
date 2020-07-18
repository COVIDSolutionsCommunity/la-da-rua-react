import React, { useEffect, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import classnames from 'classnames'
import { useParams, Link, useNavigate } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import { CATEGORIES_COLORS, CATEGORIES_PORTUGUESE } from 'utils/constants'
import { getSeller } from 'modules/sellers/actions'
import { currentSeller } from 'modules/sellers/selectors'
import { useReactGA } from 'utils/hooks'
import logo from 'assets/colagem_logo.png'

import useStyles from './styles'

const Seller = () => {
  const styles = useStyles()
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const seller = useSelector(currentSeller)

  useEffect(() => {
    dispatch(getSeller(slug))
  }, [dispatch, slug])

  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  useReactGA(slug)
  if (!seller?.name) {
    return (
      <Grid container alignItems="center" justify="center">
        <CircularProgress size={64} />
      </Grid>
    )
  }

  return (
    <Grid className={styles.view}>
      <Grid item container alignItems="center" direction="column">
        <Button
          onClick={goBack}
          className={styles.button}
          color="primary"
          startIcon={<KeyboardBackspaceIcon />}
        >
          Voltar para{' '}
          {CATEGORIES_PORTUGUESE[seller.category] === 'servicos'
            ? 'serviços'
            : CATEGORIES_PORTUGUESE[seller.category]}
        </Button>
        <Typography
          color="primary"
          className={classnames(styles.name, styles[CATEGORIES_COLORS[seller.category]])}
          component="h1"
          variant="h1"
        >
          {seller.name}
        </Typography>
        <img className={styles.coverImage} src={seller.coverImage} alt="Imagem de capa da loja" />
        <Typography color="secondary" className={styles.about} component="h3" variant="h3">
          OI, SOU {seller.user.firstName} {seller.user.lastName}
        </Typography>
        <Typography color="secondary" className={styles.about} component="h4" variant="h4">
          {seller.description}
        </Typography>
      </Grid>
      <Grid item component="section" className={styles.products}>
        {seller?.products.length ? (
          seller?.products?.map((product) => (
            <Link to={`${product.id}`} key={product.id} className={styles.img}>
              <img className={styles.product} src={product.image} alt="Imagem de capa da loja" />
            </Link>
          ))
        ) : (
          <Grid container justify="center" alignItems="center" direction="column">
            <Typography color="secondary" className={styles.about} component="h3" variant="h3">
              Em breve, esta loja irá expor os seus produtos aqui no Lá Da Rua!
            </Typography>
            <img src={logo} alt="Logo lá da rua" />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default React.memo(Seller)
