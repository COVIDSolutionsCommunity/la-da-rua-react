import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  content: {
    width: 'calc(100vw - 16px)',
    height: '100vh',
  },
  loading: {
    margin: '32px 0',
  },
  container: {
    width: '100%',
    padding: '10px 40px 40px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '300px',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  cards: {
    margin: '30px 60px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto',
    gridGap: '16px',

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: '24px',
    },
  },
  input: {
    margin: '0 10px',
  },
  icon: {
    marginBottom: '10px',
  },
  center: {
    textAlign: 'center',
  },
  comida: {
    backgroundColor: '#DC8474',
  },
  servicos: {
    backgroundColor: '#CD59C8',
  },
  vestimenta: {
    backgroundColor: '#ADC26D',
  },
  variedades: {
    backgroundColor: '#FFC720',
  },
  more: {
    margin: '1.6rem 0',
  },
}))
