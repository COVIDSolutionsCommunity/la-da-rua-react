import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'repeat(2, auto)',
    gridGap: '52px',
  },
  logo: {
    marginRight: 32,
    height: 280,
    [theme.breakpoints.down('sm')]: {
      height: 150,
      marginRight: 8,
    },
  },
  mainLogo: {
    height: 80,
    [theme.breakpoints.down('sm')]: {
      height: 50,
    },
  },
  link: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, auto)',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(4, auto)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}))
