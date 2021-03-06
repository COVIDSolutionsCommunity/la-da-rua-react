import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  section: {
    padding: '65px 45px 65px 150px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(12,12,12,0.75)',
    height: '100%',

    [theme.breakpoints.down('md')]: {
      padding: '60px 30px',
      width: '100%',
    },
  },
  button: {
    marginLeft: '32px',
    [theme.breakpoints.down('sm')]: {
      margin: '32px 16px 0',
    },
  },
  text: {
    textAlign: 'justify',

    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
}))
