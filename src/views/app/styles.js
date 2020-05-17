import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    backgroundImage: 'url(https://live.staticflickr.com/7514/27090023343_86beb47893_b.jpg)',
    backgroundRepeat: 'repeat',
    width: '100vw',
    height: '100%',
    paddingBottom: '32px',
  },
  header: {
    backgroundColor: 'rgba(0,0,0, 0,5)',
  },
  content: {
    marginTop: 80,
    width: '100%',
  },
  link: {
    fontFamily: 'Oswald',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '500',
    margin: '0 16px',
  },
  logo: {
    height: 35,
  },
}))