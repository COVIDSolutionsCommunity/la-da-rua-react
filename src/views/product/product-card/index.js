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
}) => {
  const styles = useStyles()

  return (
    <Grid className={styles.card}>
      <Grid item container direction="row" spacing={2} className={styles.inputs}>
        <Grid xs={4} spacing={2} direction="column" container item>
          <Grid item>
            {isPrevious
              ? values[id].image
              : profilePicture[id].url && (
                  <Grid item container className={styles.imageCard} direction="row">
                    {isPrevious ? (
                      <img
                        className={styles.img}
                        alt="Imagem do produto"
                        src="https://ladarua-test.s3.amazonaws.com/products/5a03adcd-73a5-4290-b4e2-b64658d71452-image-2020-05-27T214037.3241630000.jpeg"
                      />
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
                )}
          </Grid>
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
            {isPrevious && (
              <Button variant="outlined" color="primary" type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'ATUALIZAR PRODUTO'}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

ProductCard.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onChangePicture: PropTypes.func.isRequired,
  onDeleteProductClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  id: PropTypes.number.isRequired,
  profilePicture: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  isPrevious: PropTypes.bool,
}

ProductCard.defaultProps = {
  isLoading: false,
  isPrevious: false,
}

export default React.memo(ProductCard)
