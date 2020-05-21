import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  multilineColor: {
    color: 'white',
  },
}))

const ValidationTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#A19C9D',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#A19C9D',
      },
    },
  },
})(TextField)

const GeneralInput = ({ name, label, value, onChange, ...otherProps }) => {
  const styles = useStyles()

  return (
    <ValidationTextField
      variant="outlined"
      // id="standard-required"
      placeholder="Seu nome"
      InputProps={{
        className: styles.multilineColor,
      }}
      InputLabelProps={{
        className: styles.multilineColor,
      }}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      required
      autoComplete="off"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    />
  )
}

GeneralInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default React.memo(GeneralInput)
