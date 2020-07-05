import React, { useState, useCallback, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import Link from '@material-ui/core/Link'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'

import GeneralInput from 'components/general-input'
import { buySomething } from 'modules/sellers/actions'
import { isBuying } from 'modules/sellers/selectors'
import { usePrevious } from 'utils/hooks'

import useStyles from './styles'

const BuyModal = ({ open, handleClose, slug, whatsappNumber }) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    name: '',
    email: '',
    telephoneNumber: '',
    donationCategory: '',
    error: '',
  })
  const styles = useStyles()
  const isLoading = useSelector(isBuying)
  const wasLoading = usePrevious(isLoading)
  const [finished, setFinished] = useState(false)
  const [option, setValue] = useState('false')

  const handleChange = useCallback((event) => {
    setValue(String(event.target.value === 'true'))
  }, [])

  const onChange = useCallback((event) => {
    const { name, value } = event.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }, [])

  const onConfirmClick = useCallback(() => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email
      )
    ) {
      setValues((prevValues) => ({ ...prevValues, error: 'Insira um email válido' }))
      return
    }
    dispatch(buySomething(slug, values))
  }, [dispatch, slug, values])

  useEffect(() => {
    if (!isLoading && wasLoading) {
      setFinished(true)
    }
  }, [isLoading, wasLoading])

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: '#222',
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      {!finished ? (
        <>
          <DialogTitle disableTypography id="form-dialog-title">
            <Typography color="primary" component="h1" variant="h2">
              Obrigada pela compra
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para entrar em contato com o vendedor da loja e efetuar a compra, basta clicar no
              botão abaixo pelo número {whatsappNumber}
            </DialogContentText>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<WhatsAppIcon />}
              component={Link}
              href={`https://wa.me/55${whatsappNumber
                ?.match(/[0-9]/g)
                ?.join('')}?text=Oi%20encontrei%20você%20no%20projeto%20la%20da%20rua`}
            >
              Contactar o vendedor
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle disableTypography id="form-dialog-title">
            <Typography color="primary" component="h1" variant="h2">
              Para liberar o link para contatar o microempreendedor, preencha os campos abaixo.
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Quer fazer uma doação e ajudar as pessoas em vulnerabilidade social? Deixe suas
              doações com o vendedor ao coletar seu produto, nossas instituições parceiras as
              coletarão e nós lhe deixaremos informados do destino delas! Para mais informações
              sobre como funciona nosso projeto acesse @projetoladarua no Instagram.
            </DialogContentText>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <GeneralInput
                  autoFocus
                  color="secondary"
                  fullWidth
                  value={values.name}
                  label="Nome completo"
                  placeholder="Nome completo"
                  name="name"
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <GeneralInput
                  autoFocus
                  color="secondary"
                  fullWidth
                  value={values.email}
                  label="E-mail"
                  placeholder="E-mail"
                  name="email"
                  onChange={onChange}
                  error={values.error?.length > 0}
                  helperText={values.error?.length > 0 && values.error}
                />
              </Grid>
              <Grid item>
                <GeneralInput
                  autoFocus
                  color="secondary"
                  fullWidth
                  value={values.telephoneNumber}
                  label="Telefone"
                  placeholder="Telefone"
                  name="telephoneNumber"
                  onChange={onChange}
                  phoneMask
                />
              </Grid>
              <Grid item>
                <FormControl>
                  <FormLabel component="legend"> Você quer fazer uma doação?</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={option}
                    onChange={handleChange}
                    color="primary"
                  >
                    <FormControlLabel
                      value="true"
                      color="primary"
                      className={styles.labelC}
                      control={<Radio color="primary" />}
                      label="Sim, irei fazer uma doação se a compra for finalizada"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio color="primary" />}
                      className={styles.labelC}
                      label="Não, não pretendo fazer uma doação"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl className={styles.formControl}>
                  <InputLabel className={styles.label} id="demo-simple-select-label">
                    Categoria da doação
                  </InputLabel>
                  <Select
                    label="Categoria da doação"
                    value={values.donationCategory}
                    name="donationCategory"
                    onChange={onChange}
                    classes={{
                      icon: styles.icon,
                    }}
                    variant="outlined"
                    fullWidth
                    disabled={option === 'false'}
                  >
                    <MenuItem value="non_perishable_food">Alimentos não perecíveis</MenuItem>
                    <MenuItem value="hygiene_products">Produtos de Higiene</MenuItem>
                    <MenuItem value="money">Quantia em Dinheiro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              disabled={values.error.length > 0 || isLoading}
              onClick={onConfirmClick}
              color="primary"
            >
              {isLoading ? <CircularProgress size={64} /> : 'Comprar'}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

BuyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  whatsappNumber: PropTypes.string.isRequired,
}

export default React.memo(BuyModal)
