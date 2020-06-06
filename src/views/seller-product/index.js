import React, { useEffect, useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useParams, Link } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

import { getSeller } from 'modules/sellers/actions'
import { currentSeller, getCurrentProduct } from 'modules/sellers/selectors'
import { useModal } from 'utils/hooks'

import useStyles from './styles'
import BuyModal from './buy-modal'

const SellerProduct = () => {
  const styles = useStyles()
  const { slug, id } = useParams()
  const dispatch = useDispatch()
  const seller = useSelector(currentSeller)
  const currentProduct = useSelector((state) => getCurrentProduct(state, id))
  const [open, handleClose] = useModal()

  useEffect(() => {
    if (!seller.name) {
      dispatch(getSeller(slug))
    }
  }, [dispatch, seller.name, slug])

  const anotherProducts = useMemo(
    () => seller?.products?.filter((product) => product.id !== Number(id)),
    [id, seller?.products?.filter]
  )

  if (!seller?.name) {
    return (
      <Grid container alignItems="center" justify="center">
        <CircularProgress size={64} />
      </Grid>
    )
  }
  return (
    <>
      <Grid container className={styles.view}>
        <Grid item container alignItems="center" direction="column">
          <img
            className={styles.coverImage}
            src={currentProduct.image}
            alt="Imagem de capa do produto"
          />
        </Grid>
        <Grid item className={styles.products}>
          <Typography color="secondary" className={styles.about} component="h3" variant="h3">
            {currentProduct.name}
          </Typography>
          <Typography color="secondary" className={styles.about} component="h3" variant="h3">
            {currentProduct.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Typography>
          <Typography color="secondary" className={styles.about} component="h4" variant="h4">
            {currentProduct.description}
          </Typography>
          <Grid className={styles.button}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<ShoppingBasketIcon />}
              onClick={handleClose}
            >
              COMPRAR
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {anotherProducts.length && (
        <Grid className={styles.padding}>
          <Typography color="secondary" className={styles.about} component="h4" variant="h4">
            Outros produtos
          </Typography>
          <Grid container>
            {anotherProducts.map((product) => (
              <Link to={`/loja/${slug}/${product.id}`} key={product.id} className={styles.img}>
                <img className={styles.product} src={product.image} alt="Imagem de capa da loja" />
              </Link>
            ))}
          </Grid>
        </Grid>
      )}
      {open && (
        <BuyModal
          slug={slug}
          whatsappNumber={currentSeller.telephoneNumber}
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  )
}

export default React.memo(SellerProduct)