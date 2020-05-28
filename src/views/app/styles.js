import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    backgroundImage:
      'url(https://uploaddeimagens.com.br/images/002/655/312/original/Desktop_-_1_%281%29.png?1589725718)',
    backgroundSize: 'cover',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflowY: 'auto',
  },
  header: {
    backgroundColor: 'rgba(0,0,0, 0,5)',
    maxHeight: 64,
  },
  // content: {
  //   marginTop: 80,
  // },
  link: {
    fontFamily: 'Oswald',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '500',
    margin: '0 16px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      margin: '0 8px',
    },
  },
  logo: {
    height: 35,
  },
  logo2: {
    height: 35,
  },
  show: {
    display: 'block',
  },
  footer: {
    height: '60px',
    alignSelf: 'end',

    [theme.breakpoints.down('md')]: {
      height: '40px',
    },
  },
  img: {
    [theme.breakpoints.down('md')]: {
      height: '40px',
    },
  },
}))
