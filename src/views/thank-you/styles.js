import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  header: {
    marginTop: '-20px',
    height: '90vh',
    boxSizing: 'border-box',
    width: '100vw',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
      lineHeight: 1.5,
    },
  },
  section: {
    padding: '65px 45px 100px 150px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(12,12,12,0.75)',
    height: '100%',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      padding: '65px 30px 100px 30px',
      width: '100%',
    },
  },
}))
