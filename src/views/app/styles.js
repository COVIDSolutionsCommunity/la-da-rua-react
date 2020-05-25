import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    backgroundImage:
      'url(https://uploaddeimagens.com.br/images/002/655/312/original/Desktop_-_1_%281%29.png?1589725718)',
    backgroundSize: 'cover',
    height: '100%',
    paddingBottom: '32px',
    overflowX: 'hidden',
  },
  header: {
    backgroundColor: 'rgba(0,0,0, 0,5)',
  },
  content: {
    marginTop: 80,
    height: '100%',

    [theme.breakpoints.down('md')]: {
      height: '100%',
    },
  },
  link: {
    fontFamily: 'Oswald',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '500',
    margin: '0 16px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logo: {
    height: 35,
  },
  show: {
    display: 'block',
  },
  footer: {
    height: '70%',
    margin: '0 auto 10px',
  },
  img: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))
