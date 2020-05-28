/* eslint-disable no-unused-vars */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import classnames from 'classnames'
import { useParams } from '@reach/router'

import { CATEGORIES_COLORS } from 'utils/constants'

import useStyles from './styles'

const seller = {
  slug: 'marina-silva-tavares',
  name: 'Marina Silva Tavares',
  description: 'hauhau',
  category: 'food',
  user: {
    firstName: 'Marina',
    lastName: 'Silva Tavares',
    gender: 'female',
    description: 'descrição da marina',
    profileImage:
      'https://ladarua-test.s3.amazonaws.com/users/b859476a-858a-4ce0-9a1c-1d55b52e2b1b-cover-2020-05-21T200647.8606980000.png',
  },
  coverImage:
    'https://ladarua-test.s3.amazonaws.com/sellers/b255a5e4-52ce-4118-a945-a21c69154625-cover-2020-05-28T173228.5063700000.jpeg',
  products: [
    {
      id: 10,
      name: 'marinhauhauauhauhaha',
      description: 'ahuagauaugauaauhauha ahauuauhau hauahuah hauahuahahauaua hauauhauha aa',
      price: 1121.0,
      image:
        'https://ladarua-test.s3.amazonaws.com/products/afb5d2f9-f303-4aca-9597-70e1a7907959-image-2020-05-28T173244.8649720000.jpeg',
    },
  ],
}

const Seller = () => {
  const styles = useStyles()
  const { slug } = useParams()

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
