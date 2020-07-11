import React from 'react'
import Grid from '@material-ui/core/Grid'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import PropTypes from 'prop-types'

import GeneralInput from 'components/general-input'

import useStyles from './styles'

const ProductCard = ({
  id,
  isLoading,
  values,
  profilePicture,
  onDeleteClick,
  onChangePicture,
  onChange,
  onDeleteProductClick,
  isPrevious,
  onUpdateClick,
  onAddClick,
}) => {
  const styles = useStyles()

  return (
    <Grid className={styles.card}>
      <Grid item container direction="row" spacing={2} className={styles.inputs}>
        <Grid xs={4} spacing={2} direction="column" container item>
          {(isPrevious || profilePicture[id].url.length > 1) && (
            <Grid item>
              <Grid item container className={styles.imageCard} direction="row">
                {isPrevious ? (
                  <img className={styles.img} alt="Imagem do produto" src={values[id].image} />
                ) : (
                  <img
                    className={styles.img}
                    alt="Imagem do produto"
                    src={profilePicture[id].url}
                  />
                )}
                <Grid container>
                  {!isPrevious && (
                    <IconButton onClick={onDeleteClick} className={styles.buttonIcon}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  )}
                  <Link
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer"
                    href={profilePicture.url}
                  >
                    Imagem do seu produto
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          )}
          {!isPrevious && (
            <Grid item>
              <label htmlFor={`icon-button-file-${id}`} className={styles.fullWidth}>
                <input
                  accept="image/jpeg, image/png"
                  type="file"
                  onChange={onChangePicture}
                  id={`icon-button-file-${id}`}
                  style={{ display: 'none' }}
                  data-id={id}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  component="span"
                  className={styles.button}
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                >
                  IMAGEM DO PRODUTO
                </Button>
              </label>
            </Grid>
          )}
        </Grid>
        <Grid container xs={8} spacing={2} direction="column" item>
          <Grid item>
            <GeneralInput
              name="name"
              label="Nome do Produto"
              placeholder="Adicione aqui o nome do seu produto"
              multiline
              value={values[id].name}
              onChange={onChange}
              id={`icon-name-file-${id}`}
              inputProps={{
                'data-id': id,
              }}
            />
          </Grid>
          <Grid item>
            <CurrencyTextField
              label="Preço"
              name="price"
              variant="outlined"
              value={values[id].price}
              currencySymbol="R$"
              outputFormat="string"
              onChange={onChange}
              decimalCharacter="."
              digitGroupSeparator=","
              minimumValue="0"
              color="white"
              fullWidth
              id={`icon-price-file-${id}`}
              data-id={id}
              inputProps={{
                'data-id': id,
              }}
            />
          </Grid>
          <Grid item>
            <GeneralInput
              name="description"
              label="Descrição do Produto"
              placeholder="Adicione aqui uma descrição do seu produto"
              value={values[id].description}
              onChange={onChange}
              multiline
              id={`icon-description-file-${id}`}
              inputProps={{
                'data-id': id,
              }}
            />
          </Grid>
          <Grid item container justify="flex-end">
            <IconButton onClick={onDeleteProductClick} className={styles.buttonIcon}>
              <DeleteIcon color="primary" />
            </IconButton>
            {isPrevious ? (
              <Button
                onClick={onUpdateClick}
                variant="outlined"
                color="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'ATUALIZAR PRODUTO'}
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={onAddClick}
                disabled={
                  isLoading ||
                  !values[id].description.length ||
                  !values[id].price.length ||
                  !values[id].name.length
                }
              >
                {isLoading ? <CircularProgress size={24} /> : 'ADICIONAR PRODUTO'}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

ProductCard.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func,
  onChangePicture: PropTypes.func,
  onDeleteProductClick: PropTypes.func.isRequired,
  onUpdateClick: PropTypes.func,
  onAddClick: PropTypes.func,
  isLoading: PropTypes.bool,
  id: PropTypes.number.isRequired,
  profilePicture: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ).isRequired,
  isPrevious: PropTypes.bool,
}

ProductCard.defaultProps = {
  isLoading: false,
  isPrevious: false,
  onUpdateClick: () => {},
  onAddClick: () => {},
  onDeleteClick: () => {},
  onChangePicture: () => {},
}

export default React.memo(ProductCard)
