import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  header: {
    marginTop: '-80px',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
      lineHeight: 1.5,
    },
  },
  section: {
    padding: '60px 45px 100px 150px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(12,12,12,0.75)',
    height: '100%',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      padding: '50px 20px 150px',
    },
  },
  text: {
    textAlign: 'justify',
    marginBottom: '32px',

    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  addButton: {
    marginTop: 16,
    marginLeft: 8,
  },
}))
