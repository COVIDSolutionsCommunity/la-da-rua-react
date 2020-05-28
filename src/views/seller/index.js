/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import classnames from 'classnames'
import { useParams } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'

import { CATEGORIES_COLORS } from 'utils/constants'
import { getSeller } from 'modules/sellers/actions'
import { currentSeller } from 'modules/sellers/selectors'

import useStyles from './styles'

const Seller = () => {
  const styles = useStyles()
  const { slug } = useParams()
  const dispatch = useDispatch()
  const seller = useSelector(currentSeller)

  useEffect(() => {
    dispatch(getSeller(slug))
  }, [dispatch, slug])

  if (!seller?.name) return null
  return (
    <Grid className={styles.view}>
      <Grid item container alignItems="center" direction="column">
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
      <Grid item className={styles.products}>
        {seller.products.map((product) => (
          <button type="button" key={product.id} className={styles.img}>
            <img className={styles.product} src={product.image} alt="Imagem de capa da loja" />
          </button>
        ))}
      </Grid>
    </Grid>
  )
}

export default React.memo(Seller)
