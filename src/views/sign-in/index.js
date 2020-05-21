import React, { useState, useCallback } from 'react'
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

import useStyles from './styles'
import GeneralInput from './general-input'

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
  const [values, setValues] = useState(INITIAL_STATE)
  const [errors, setErros] = useState('')
  const [profilePicture, setProfilePicture] = useState([])

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
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          values.email
        )
      ) {
        setErros((prevValues) => ({ ...prevValues, email: 'Insira um email válido' }))
      }
    },
    [values.email]
  )

  return (
    <Grid className={styles.header} container alignItems="center" direction="row">
      <Grid className={styles.section} item>
        <Typography color="primary" className={styles.title} component="h1" variant="h1">
          CADASTRE-SE JÁ
        </Typography>
        <Typography className={styles.text} color="primary" component="h2" variant="h2">
          Ei, Microempreendedor de Fortaleza! Está precisando de uma ajudinha com as vendas e ainda
          que fazer parte de uma rede que está ativamente ajudando no combate ao COVID-19? Faça seu
          cadastro!
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
            <Grid item xs={10} container direction="row">
              <Grid item>
                <label htmlFor="icon-button-file" className={styles.fullWidth}>
                  <input
                    accept="image/*"
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
                    startIcon={<CloudUploadIcon />}
                  >
                    Selecione uma imagem de perfil
                  </Button>
                </label>
              </Grid>
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
              >
                CADASTRE-SE
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default React.memo(SignIn)
