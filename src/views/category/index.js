import React, { useState, useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { useParams, Link } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import { getSellersCategory, getSellersSearch, getNextPage } from 'modules/sellers/actions'
import { getCurrentSellers, isRegisterLoading } from 'modules/sellers/selectors'
import { useDebounce, useReactGA } from 'utils/hooks'

import MainCard from './card'
import useStyles from './styles'

const Category = () => {
  const styles = useStyles()
  const [values, setValues] = useState('')
  const { category } = useParams()
  const dispatch = useDispatch()
  const { result: currentSellers, count } = useSelector((state) =>
    getCurrentSellers(state, category)
  )
  const isLoading = useSelector(isRegisterLoading)
  const debounced = useDebounce(values, 500)

  const onChange = useCallback((event) => {
    setValues(event.target.value)
  }, [])

  const onMoreClick = useCallback(() => {
    dispatch(getNextPage(category))
  }, [category, dispatch])

  useEffect(() => {
    if (currentSellers.length < 1) {
      dispatch(getSellersCategory(category))
    }
  }, [category, currentSellers.length, dispatch])

  useEffect(() => {
    if (debounced) {
      dispatch(getSellersSearch(category, debounced))
    }
  }, [category, debounced, dispatch])

  useReactGA(category)
  if (!currentSellers) {
    return (
      <Grid container alignItems="center" justify="center">
        <CircularProgress size={64} />
      </Grid>
    )
  }

  const dontShowMoreButton = count > 10 && !isLoading && !(count === currentSellers?.length)
  return (
    <Grid className={styles.content} item>
      <Grid className={classnames(styles.container, styles[category])}>
        <Button
          component={Link}
          to="/"
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
      {!!currentSellers?.length && (
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
      )}
      {isLoading && (
        <Grid container justify="center" alignItems="center" className={styles.loading}>
          <CircularProgress size={32} />
        </Grid>
      )}
    </Grid>
  )
}

export default React.memo(Category)
