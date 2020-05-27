import React, { useState, useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useNavigate, Link as RouterLink } from '@reach/router'

import { registerUser } from 'modules/user/actions'
import { isRegisterLoading } from 'modules/user/selectors'
import { usePrevious } from 'utils/hooks'
import GeneralInput from 'components/general-input'

import useStyles from './styles'

const fields = [
  {
    name: 'fullName',
    placeholder: 'Qual é o seu nome?',
    label: 'Nome completo',
  },
  {
    name: 'email',
    placeholder: 'Qual é o seu email?',
    label: 'E-mail',
  },
  {
    name: 'password1',
    placeholder: 'Digite aqui uma senha',
    label: 'Senha',
    type: 'password',
  },
  {
    name: 'password2',
    placeholder: 'Digite aqui novamente a senha',
    label: 'Senha',
    type: 'password',
  },
  {
    name: 'description',
    placeholder: 'Faça uma pequena descrição sua',
    label: 'Descrição',
    multiline: true,
  },
]

const INITIAL_STATE = {
  fullName: '',
  email: '',
  password1: '',
  password2: '',
  gender: '',
}

const SignIn = () => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const [values, setValues] = useState(INITIAL_STATE)
  const [errors, setErros] = useState('')
  const [profilePicture, setProfilePicture] = useState([])
  const isLoading = useSelector(isRegisterLoading)
  const wasLoading = usePrevious(isLoading)
  const navigate = useNavigate()

  const onChangePicture = useCallback((event) => {
    const file = event.currentTarget.files[0]
    setProfilePicture({
      url: URL.createObjectURL(event.target.files[0]),
      id: file,
    })
  }, [])

  const onChange = useCallback((event) => {
    const { name, value } = event.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }, [])

  const onDeleteClick = useCallback(() => {
    setProfilePicture([])
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      if (values.password1 !== values.password2) {
        setErros((prevValues) => ({ ...prevValues, password1: 'As senhas devem ser iguais' }))
        return
      }
      if (values.password1.length < 6) {
        setErros((prevValues) => ({
          ...prevValues,
          password1: 'As senha deve ter mais que 6 caracteres',
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
      if (!profilePicture[0]?.id) {
        setErros((prevState) => ({ ...prevState, profilePicture: 'Foto obrigatória' }))
      }
      const { fullName, ...payload } = values
      dispatch(
        registerUser({
          ...payload,
          firstName: values.fullName.split(' ')[0],
          lastName: values.fullName.split(' ').slice(1).join(' '),
          profileImage: profilePicture.id,
        })
      )
    },
    [dispatch, profilePicture, values]
  )

  useEffect(() => {
    if (!isLoading && wasLoading) {
      navigate('/sobre-seu-negocio')
    }
  }, [isLoading, navigate, wasLoading])

  return (
    <Grid item className={styles.header} container alignItems="center" direction="row">
      <Grid className={styles.section} item>
        <Typography color="primary" className={styles.title} component="h1" variant="h1">
          CADASTRE-SE JÁ
        </Typography>
        <Typography className={styles.text} color="primary" component="h2" variant="h2">
          Ei, Microempreendedor de Fortaleza! Está precisando de uma ajudinha com as vendas e ainda
          que fazer parte de uma rede que está ativamente ajudando no combate ao COVID-19? Faça seu
          cadastro!
          <Link component={RouterLink} to="/login">
            Para se logar, clique aqui
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
            <Grid item xs={10}>
              <FormControl className={styles.formControl}>
                <InputLabel className={styles.label} id="demo-simple-select-label">
                  Gênero
                </InputLabel>
                <Select
                  label="Gênero"
                  value={values.gender}
                  name="gender"
                  onChange={onChange}
                  classes={{
                    icon: styles.icon,
                  }}
                  placeholder="Hello"
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="female">Feminino</MenuItem>
                  <MenuItem value="male">Masculino</MenuItem>
                  <MenuItem value="other">Outros</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <label htmlFor="icon-button-file" className={styles.fullWidth}>
                <input
                  accept="image/jpeg, image/png"
                  type="file"
                  onChange={onChangePicture}
                  id="icon-button-file"
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  component="span"
                  className={styles.button}
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                >
                  Selecione uma imagem de perfil
                </Button>
              </label>
            </Grid>
            <Grid item xs={10}>
              {profilePicture.url && (
                <Grid item className={styles.deleteButton}>
                  <IconButton onClick={onDeleteClick} className={styles.buttonIcon}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                  <Link
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer"
                    href={profilePicture.url}
                  >
                    Imagem de perfil
                  </Link>
                </Grid>
              )}
            </Grid>
            <Grid item xs={10}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                type="submit"
                className={styles.button}
                disabled={isLoading || !profilePicture?.id}
              >
                {isLoading ? <CircularProgress size={24} /> : 'CADASTRE-SE'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default React.memo(SignIn)
