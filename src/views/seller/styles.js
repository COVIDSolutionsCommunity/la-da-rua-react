import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  view: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: 'auto',
    gridGap: '50px',
    padding: theme.spacing(4),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto auto',
    },
  },
  name: {
    padding: '12px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '32px',
  },
  coverImage: {
    borderRadius: '50%',
    height: '150px',
    width: '150px',
    margin: '32px',
  },
  pink: {
    backgroundColor: '#DC8474',
  },
  green: {
    backgroundColor: '#83B4BB',
  },
  blue: {
    backgroundColor: '#ADC26D',
  },
  yellow: {
    backgroundColor: '#F6F193',
  },
  img: {
    height: '200px',
    width: '200px',
    margin: 8,
    position: 'relative',
    backgroundColor: theme.palette.secondary.main,
  },
  product: {
    height: '200px',
    width: '200px',
    margin: 8,

    '&:hover': {
      opacity: 0.15,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  productName: {
    position: 'absolute',
    width: '150px',
    top: 10,
    left: 15,
    zIndex: 2,
    margin: 8,
  },
  productDescription: {
    position: 'absolute',
    width: '150px',
    bottom: 20,
    left: 15,
    zIndex: 2,
    fontSize: '14px',
  },
}))
