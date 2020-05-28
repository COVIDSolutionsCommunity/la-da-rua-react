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
        variant="outlined"
        placeholder="Procure uma loja"
        multiline
        value={values}
        onChange={onChange}
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
      <Grid container>
        <Grid item cs={6}>
          <MainCard />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default React.memo(Category)
