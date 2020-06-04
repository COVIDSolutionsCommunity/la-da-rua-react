import React, { useState, useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { useParams } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import { getSellersCategory, getSellersSearch } from 'modules/sellers/actions'
import { getSellers, isRegisterLoading } from 'modules/sellers/selectors'
import { useDebounce } from 'utils/hooks'

import MainCard from './card'
import useStyles from './styles'

const Category = () => {
  const styles = useStyles()
  const [values, setValues] = useState('')
  const { category } = useParams()
  const dispatch = useDispatch()
  const sellers = useSelector(getSellers)
  const isLoading = useSelector(isRegisterLoading)
  const debounced = useDebounce(values, 500)

  const onChange = useCallback((event) => {
    setValues(event.target.value)
  }, [])

  useEffect(() => {
    dispatch(getSellersCategory(category))
  }, [category, dispatch])

  useEffect(() => {
    if (debounced) {
      dispatch(getSellersSearch(category, debounced))
    }
  }, [category, debounced, dispatch])

  if (!sellers) {
    return (
      <Grid container alignItems="center" justify="center">
        <CircularProgress size={64} />
      </Grid>
    )
  }
  return (
    <Grid
      className={styles.content}
      item
      container
      alignItems="center"
      justify="center"
      direction="row"
    >
      {isLoading ? (
        <CircularProgress size={32} />
      ) : (
        <>
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
          {sellers.length > 0 ? (
            <Grid className={styles.cards}>
              {sellers?.map((seller) => (
                <MainCard key={seller.id} seller={seller} />
              ))}
            </Grid>
          ) : (
            <Typography className={styles.center} color="primary" variant="h1" component="h1">
              {' '}
              Não encontramos nenhum vendedor com os dados oferecidos{' '}
            </Typography>
          )}
        </>
      )}
    </Grid>
  )
}

export default React.memo(Category)
