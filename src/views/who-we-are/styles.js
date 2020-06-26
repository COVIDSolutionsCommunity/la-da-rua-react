import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  grid: {
    paddingTop: '36px',

    [theme.breakpoints.down('sm')]: {
      paddingTop: '0',
    },
  },
  section: {
    padding: '65px 45px 65px 150px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(12,12,12,0.75)',
    height: '100%',

    [theme.breakpoints.down('sm')]: {
      padding: '30px',
      width: '100%',
    },
  },
  img: {
    height: '400px',
    marginLeft: '70px',

    [theme.breakpoints.down('sm')]: {
      height: '250px',
      margin: '30px auto',
    },
  },
  text: {
    textAlign: 'justify',

    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  url: {
    margin: '32px 0',
  },
}))
