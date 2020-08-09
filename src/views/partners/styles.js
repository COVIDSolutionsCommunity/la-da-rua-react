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
    textDecoration: 'none',

    '&:hover': {
      opacity: '0.5',
    },
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
    objectFit: 'scale-down',
    height: '200px',
    width: '200px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
}))
