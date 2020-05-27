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
import { useNavigate } from '@reach/router'

import { createSeller, getSeller, updateSeller } from 'modules/user/actions'
import { isCreatingSeller, getMySeller, isUpdatingSeller } from 'modules/user/selectors'
import { usePrevious, useRedirect } from 'utils/hooks'
import GeneralInput from 'components/general-input'

import useStyles from './styles'

const BRAZILIAN_STATES = [
  'AC',
  'AL',
  'AM',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RO',
  'RS',
  'RR',
  'SC',
  'SE',
  'SP',
  'TO',
]

const fields = [
  {
    name: 'name',
    placeholder: 'Qual é o nome do seu negócio?',
    label: 'Nome',
  },
  {
    name: 'description',
    placeholder: 'Faça uma descrição do seu negócio',
    label: 'Descrição do seu negócio',
    multiline: true,
  },
  {
    name: 'cnpjCpf',
    placeholder: 'Digite aqui seu CPF ou o CNPJ do seu negócio',
    label: 'CNPJ ou CPF',
    type: 'number',
  },
  {
    name: 'telephoneNumber',
    placeholder: 'Digite o número do telefone do seu negócio',
    label: 'Telefone',
    type: 'number',
  },
  {
    name: 'neighborhood',
    placeholder: 'Digite aqui o seu bairro',
    label: 'Bairro',
  },
  {
    name: 'city',
    placeholder: 'Digite aqui a sua cidade',
    label: 'Cidade',
  },
]

const INITIAL_STATE = {
  name: '',
  description: '',
  neighborhood: '',
  telephoneNumber: '',
  city: '',
  state: '',
  category: '',
  cnpjCpf: '',
}

const CreateSeller = () => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const [values, setValues] = useState(INITIAL_STATE)
  const [profilePicture, setProfilePicture] = useState([])
  const isCurrent = useSelector(getMySeller)
  const isLoading = useSelector(isCreatingSeller)
  const wasLoading = usePrevious(isLoading)
  const isUpdatingLoading = useSelector(isUpdatingSeller)
  const wasUpdatingLoading = usePrevious(isLoading)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getSeller())
  }, [dispatch])

  useEffect(() => {
    if (isCurrent?.name.length) {
      const initialValue = Object.keys(INITIAL_STATE).reduce(
        (obj, item) => Object.assign(obj, { [item]: isCurrent[item] }),
        {}
      )
      setValues(initialValue)
      setProfilePicture({
        url: isCurrent.coverImage,
      })
    }
  }, [isCurrent, isCurrent?.name?.length])

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
      if (isCurrent?.name.length) {
        if (profilePicture.id) {
          dispatch(
            updateSeller({
              ...values,
              profileImage: profilePicture.id,
            })
          )
          return
        }
        dispatch(updateSeller(values))
        return
      }
      dispatch(
        createSeller({
          ...values,
          profileImage: profilePicture.id,
        })
      )
    },
    [dispatch, isCurrent?.name?.length, profilePicture.id, values]
  )

  useEffect(() => {
    if (!isLoading && wasLoading) {
      // navigate('/')
    }
  }, [isLoading, navigate, wasLoading])

  useEffect(() => {
    if (!isUpdatingLoading && wasUpdatingLoading) {
      // navigate('/')
    }
  }, [isLoading, isUpdatingLoading, navigate, wasLoading, wasUpdatingLoading])

  useRedirect()

  return (
    <Grid item className={styles.header} container alignItems="center" direction="row">
      <Grid className={styles.section} item>
        <Typography color="primary" className={styles.title} component="h1" variant="h1">
          Registre o seu negócio
        </Typography>
        <Typography className={styles.text} color="primary" component="h2" variant="h2">
          Ei, Microempreendedor de Fortaleza! Está precisando de uma ajudinha com as vendas e ainda
          que fazer parte de uma rede que está ativamente ajudando no combate ao COVID-19?
          <br />
          Conte-nos sobre o seu negócio!
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
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...otherProps}
                  />
                </Grid>
              )
            })}
            <Grid item xs={10}>
              <FormControl className={styles.formControl}>
                <InputLabel className={styles.label} id="demo-simple-select-label">
                  Estado
                </InputLabel>
                <Select
                  label="Estado"
                  value={values.state}
                  name="state"
                  onChange={onChange}
                  classes={{
                    icon: styles.icon,
                  }}
                  variant="outlined"
                  fullWidth
                >
                  {BRAZILIAN_STATES.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl className={styles.formControl}>
                <InputLabel className={styles.label} id="demo-simple-select-label">
                  Categoria
                </InputLabel>
                <Select
                  label="Gênero"
                  value={values.category}
                  name="category"
                  onChange={onChange}
                  classes={{
                    icon: styles.icon,
                  }}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="food">Comida</MenuItem>
                  <MenuItem value="clothing">Vestimenta</MenuItem>
                  <MenuItem value="decoration">Decoracão</MenuItem>
                  <MenuItem value="misc">Variedades</MenuItem>
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
                  Selecione uma imagem do seu negócio
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
                    Imagem do seu negócio
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
                disabled={isLoading || !profilePicture?.url || isUpdatingLoading}
              >
                {isLoading || isUpdatingLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  'ENVIAR INFORMAÇÕES'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default React.memo(CreateSeller)
