import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  flex: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto',
    gridGap: '80px',
    padding: '60px 10px',
    width: '100%',
    marginTop: '60px',

    [theme.breakpoints.down('md')]: {
      padding: 0,
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto auto',
      gridGap: '16px',
    },

    [theme.breakpoints.down('sm')]: {
      padding: 0,
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto auto',
      gridGap: '16px',
    },
  },
  item: {
    padding: '20px',
    backgroundColor: 'white',
  },
  about: {
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  name: {
    borderTop: '1px solid black',
  },
  coverImage: {
    objectFit: 'cover',
    height: '200px',
    width: '200px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  img: {
    height: '200px',
    width: '200px',
    margin: 8,
    position: 'relative',
    backgroundColor: theme.palette.secondary.main,
    marginBottom: '10px',
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
}))
