import React, { useState, useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useNavigate, Link as RouterLink } from '@reach/router'

import { login } from 'modules/user/actions'
import { isLoginLoading, loginError } from 'modules/user/selectors'
import { usePrevious } from 'utils/hooks'
import GeneralInput from 'components/general-input'

import useStyles from './styles'

const fields = [
  {
    name: 'email',
    placeholder: 'Qual é o seu email?',
    label: 'Email',
  },
  {
    name: 'password',
    placeholder: 'Qual é a sua senha?',
    label: 'Senha',
    type: 'password',
  },
]

const INITIAL_STATE = {
  email: '',
  password: '',
}

const Login = () => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const [values, setValues] = useState(INITIAL_STATE)
  const [errors, setErros] = useState('')
  const error = useSelector(loginError)
  const isLoading = useSelector(isLoginLoading)
  const wasLoading = usePrevious(isLoading)
  const navigate = useNavigate()

  const onChange = useCallback((event) => {
    const { name, value } = event.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      if (values.password.length < 6) {
        setErros((prevValues) => ({
          ...prevValues,
          password: 'A senha deve ter mais que 6 caracteres',
        }))
        return
      }
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          values.email
        )
      ) {
        setErros((prevValues) => ({ ...prevValues, email: 'Insira um email válido' }))
        return
      }
      dispatch(login(values))
    },
    [dispatch, values]
  )

  useEffect(() => {
    if (!isLoading && wasLoading && Object.keys(error).length < 1) {
      navigate('/')
    }
  }, [error, isLoading, navigate, wasLoading])

  return (
    <Grid item className={styles.header} container alignItems="center" direction="row">
      <Grid className={styles.section} item>
        <Typography color="primary" className={styles.title} component="h1" variant="h1">
          FAÇA LOGIN
        </Typography>
        <Typography className={styles.text} color="primary" component="h2" variant="h2">
          Ei, Microempreendedor de Fortaleza! Está precisando de uma ajudinha com as vendas e ainda
          que fazer parte de uma rede que está ativamente ajudando no combate ao COVID-19? Com o seu
          cadastro, será possível atualizar as suas informações!{' '}
          <Link component={RouterLink} to="/cadastre-se">
            Para se cadastrar, clique aqui
          </Link>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid item container direction="column" spacing={2} className={styles.inputs}>
            {fields.map((field) => {
              const { name, label, value, ...otherProps } = field
              return (
                <Grid key={name} item xs={10}>
                  <GeneralInput
                    name={name}
                    label={label}
                    value={values[name]}
                    onChange={onChange}
                    error={errors[name]?.length > 0}
                    helperText={errors[name]?.length > 0 && errors[name]}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...otherProps}
                  />
                </Grid>
              )
            })}
            {error && Object.keys(error).length && (
              <Grid item xs={10}>
                <Typography className={styles.error} component="span">
                  Impossível entrar com as credenciais fornecidas, cheque seu email e senha
                </Typography>
              </Grid>
            )}
            <Grid item xs={10}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                type="submit"
                className={styles.button}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'ENTRAR'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default React.memo(Login)
