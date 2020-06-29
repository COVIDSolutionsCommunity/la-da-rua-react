import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  view: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridTemplateRows: 'auto',
    gridGap: '50px',
    padding: '30px',

    [theme.breakpoints.down('sm')]: {
      padding: 0,
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto auto',
      gridGap: '16px',
    },
  },
  about: {
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  name: {
    padding: '12px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '32px',
  },
  coverImage: {
    objectFit: 'cover',
    height: '300px',
    margin: '32px',
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
  button: {
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  padding: {
    padding: '10px 50px',
    boxSizing: 'border-box',
  },
  buyButton: {
    backgroundColor: 'yellow',
  },
}))
