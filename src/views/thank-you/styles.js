import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  header: {
    marginTop: '-80px',
    paddingBottom: theme.spacing(3),
    height: '90vh',
    boxSizing: 'border-box',
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
    width: '100vw',

    [theme.breakpoints.down('sm')]: {
      padding: '65px 30px 100px 30px',
      width: '100%',
    },
  },
}))
