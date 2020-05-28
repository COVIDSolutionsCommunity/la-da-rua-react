import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    margin: '0 auto',
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
    marginTop: 32,

    // [theme.breakpoints.down('sm')]: {
    //   gridTemplateColumns: '1fr',
    //   gridTemplateRows: 'repeat(4, auto)',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
  },
}))
