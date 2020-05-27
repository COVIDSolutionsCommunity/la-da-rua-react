import React, { useState, useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useNavigate } from '@reach/router'

import { createProduct, getProducts } from 'modules/user/actions'
import { isCreatingProduct, getMyProducts, isUpdatingProduct } from 'modules/user/selectors'
import { usePrevious, useRedirect } from 'utils/hooks'

import useStyles from './styles'
import ProductCard from './product-card'

const INITIAL_STATE = {
  name: '',
  description: '',
  price: '',
  productPicture: '',
}

const Product = () => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const [values, setValues] = useState([INITIAL_STATE])
  const [previousValues, setPreviousValues] = useState([])
  const [profilePicture, setProfilePicture] = useState([{ id: '', url: '' }])
  const previousProducts = useSelector(getMyProducts)
  const isLoading = useSelector(isCreatingProduct)
  const wasLoading = usePrevious(isLoading)
  const isUpdatingLoading = useSelector(isUpdatingProduct)
  const wasUpdatingLoading = usePrevious(isUpdatingLoading)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    if (previousProducts?.length) {
      setPreviousValues(previousProducts)
    }
  }, [previousProducts, previousProducts?.length])

  const onChangePicture = useCallback(
    (event) => {
      const file = event.currentTarget.files[0]
      const newValue = [...profilePicture]
      newValue[event.target.dataset.id].id = file
      newValue[event.target.dataset.id].url = URL.createObjectURL(event.target.files[0])
      setProfilePicture(newValue)
    },
    [profilePicture]
  )

  const onChange = useCallback(
    (event) => {
      const { value, dataset, name } = event.target
      const newValue = [...values]
      newValue[dataset.id] = {
        ...newValue[dataset.id],
        [name]: value,
      }
      setValues(newValue)
    },
    [values]
  )

  const onPreviousChange = useCallback(
    (event) => {
      const { value, dataset, name } = event.target
      const newValue = [...previousValues]
      newValue[dataset.id] = {
        ...newValue[dataset.id],
        [name]: value,
      }
      setPreviousValues(newValue)
    },
    [previousValues]
  )

  const onDeleteClick = useCallback(
    (id) => () => {
      setProfilePicture((prevState) => prevState.filter((file, index) => index !== id))
    },
    []
  )

  const onDeleteProductClick = useCallback(
    (id) => () => {
      setValues((prevState) => prevState.filter((file, index) => index !== id))
      setProfilePicture((prevState) => prevState.filter((file, index) => index !== id))
    },
    []
  )

  const onDeletePrevious = useCallback(
    (id) => () => {
      setValues((prevState) => prevState.filter((file, index) => index !== id))
      setProfilePicture((prevState) => prevState.filter((file, index) => index !== id))
    },
    []
  )

  const onUpdateClick = useCallback(
    (id) => () => {
      setValues((prevState) => prevState.filter((file, index) => index !== id))
      setProfilePicture((prevState) => prevState.filter((file, index) => index !== id))
    },
    []
  )

  const onAddClick = useCallback(() => {
    setValues((prevState) => [...prevState, INITIAL_STATE])
    setProfilePicture((prevState) => [...prevState, { id: '', url: '' }])
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      values.map((value, index) =>
        dispatch(
          createProduct({
            ...value,
            price: value.price.replace(',', ''),
            profileImage: profilePicture[index].id,
          })
        )
      )
    },
    [dispatch, profilePicture, values]
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
          Registre o seu produto
        </Typography>
        <Typography className={styles.text} color="primary" component="h2" variant="h2">
          Agora é a sua parte de registrar os seus produtos! Para adicionar mais de um, basta clicar
          no botão Adicionar outro Produto! Caso já tenha adicionado todos os seus produtos, clique
          em finalizar!
        </Typography>
        <form onSubmit={handleSubmit}>
          {previousValues.map((value, index) => (
            <ProductCard
              id={index}
              // eslint-disable-next-line react/no-array-index-key
              key={`products-old-${index}`}
              values={previousValues}
              onChange={onPreviousChange}
              onDeleteProductClick={onDeletePrevious(index)}
              onUpdateClick={onUpdateClick}
              profilePicture={profilePicture}
              isPrevious
              isLoading={isUpdatingLoading}
            />
          ))}
          {values.map((value, index) => (
            <ProductCard
              id={index}
              // eslint-disable-next-line react/no-array-index-key
              key={`products-${index}`}
              values={values}
              onChange={onChange}
              onChangePicture={onChangePicture}
              onDeleteClick={onDeleteClick(index)}
              onDeleteProductClick={onDeleteProductClick(index)}
              profilePicture={profilePicture}
            />
          ))}
          <Grid item container justify="flex-end">
            <Button
              variant="outlined"
              color="primary"
              className={styles.addButton}
              onClick={onAddClick}
            >
              {isLoading || isUpdatingLoading ? (
                <CircularProgress size={24} />
              ) : (
                'ADICIONAR OUTRO PRODUTO'
              )}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              className={styles.addButton}
              // disabled={isLoading || !profilePicture?.url || isUpdatingLoading}
            >
              {isLoading || isUpdatingLoading ? <CircularProgress size={24} /> : 'FINALIZAR'}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default React.memo(Product)
