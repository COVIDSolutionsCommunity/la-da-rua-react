import React, { useState, useCallback, useEffect, useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { useParams, useNavigate } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import { CATEGORIES_NAMES } from 'utils/constants'
import { getSellersCategory, getSellersSearch, getNextPage } from 'modules/sellers/actions'
import { getSellers, isRegisterLoading, getCount } from 'modules/sellers/selectors'
import { useDebounce, useReactGA } from 'utils/hooks'

import MainCard from './card'
import useStyles from './styles'

const Category = () => {
  const styles = useStyles()
  const [values, setValues] = useState('')
  const { category } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sellers = useSelector(getSellers)
  const isLoading = useSelector(isRegisterLoading)
  const count = useSelector(getCount)
  const debounced = useDebounce(values, 500)

  const onChange = useCallback((event) => {
    setValues(event.target.value)
  }, [])

  const onMoreClick = useCallback(() => {
    dispatch(getNextPage(category))
  }, [category, dispatch])

  useEffect(() => {
    dispatch(getSellersCategory(category))
  }, [category, dispatch])

  useEffect(() => {
    if (debounced) {
      dispatch(getSellersSearch(category, debounced))
    }
  }, [category, debounced, dispatch])

  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const currentSellers = useMemo(
    () => sellers.filter((seller) => seller.category === CATEGORIES_NAMES[category][0]),
    [category, sellers]
  )

  useReactGA(category)
  if (!sellers) {
    return (
      <Grid container alignItems="center" justify="center">
        <CircularProgress size={64} />
      </Grid>
    )
  }

  const dontShowMoreButton = count > 10 && !isLoading && !(count === currentSellers.length)
  return (
    <Grid
      className={styles.content}
      item
      container
      alignItems="center"
      justify="center"
      direction="row"
    >
      {!!currentSellers.length && (
        <>
          <Grid className={classnames(styles.container, styles[category])}>
            <Button
              onClick={goBack}
              className={styles.button}
              color="primary"
              startIcon={<KeyboardBackspaceIcon />}
            >
              Ver outras categorias
            </Button>
            <Typography className={styles.title} color="primary" variant="h1" component="h1">
              {category === 'servicos' ? 'serviços' : category}
            </Typography>
            <TextField
              variant="filled"
              placeholder="Procure uma loja"
              label="Buscar"
              multiline
              value={values}
              onChange={onChange}
              className={styles.input}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={styles.icon} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container direction="column" alignItems="center" justify="center">
            {currentSellers.length > 0 ? (
              <Grid className={styles.cards}>
                {currentSellers?.map((seller) => (
                  <MainCard key={seller.id} seller={seller} />
                ))}
              </Grid>
            ) : (
              <Typography className={styles.center} color="primary" variant="h1" component="h1">
                {' '}
                Não encontramos nenhum vendedor com os dados oferecidos{' '}
              </Typography>
            )}
            {dontShowMoreButton && (
              <Button
                onClick={onMoreClick}
                variant="contained"
                color="secondary"
                className={styles.more}
              >
                Ver mais lojas
              </Button>
            )}
          </Grid>
        </>
      )}
      {isLoading && <CircularProgress size={32} />}
    </Grid>
  )
}

export default React.memo(Category)
