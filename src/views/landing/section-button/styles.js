import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  img: {
    width: '100%',
    height: '346px',
    '&:hover': {
      opacity: 0.6,
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100px',
      objectFit: 'cover',
    },
  },
  section: {
    position: 'relative',
    zIndex: '2',
    width: '250px',
    height: '346px',
    backgroundColor: 'black',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '110px',
      objectFit: 'cover',
    },
  },
  button: {
    position: 'absolute',
    zIndex: 3,
    top: '40%',
    width: '100%',
    color: 'white',
    padding: '12px',
    textTransform: 'uppercase',
    textAlign: 'center',
    boxSizing: 'border-box',
    fontSize: 32,
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
}))
