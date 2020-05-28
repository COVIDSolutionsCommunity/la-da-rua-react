import React, { useState, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

import MainCard from './card'
import useStyles from './styles'

const Category = () => {
  const styles = useStyles()
  const [values, setValues] = useState('')

  const onChange = useCallback((event) => {
    setValues(event.target.value)
  }, [])

  return (
    <Grid
      className={styles.content}
      item
      container
      alignItems="center"
      justify="center"
      direction="row"
    >
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
      <Grid className={styles.cards}>
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
      </Grid>
    </Grid>
  )
}

export default React.memo(Category)
