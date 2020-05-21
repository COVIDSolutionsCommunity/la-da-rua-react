import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  header: {
    marginTop: '-80px',
    height: '100%',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
      lineHeight: 1.5,
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
    marginBottom: '32px',

    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  inputs: {
    margin: 'auto auto',
  },
  select: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    '&:focus': {
      borderColor: 'white',
    },
  },
  icon: {
    fill: 'white',
  },
  formControl: {
    width: '100%',
  },
  label: {
    paddingLeft: '16px',
  },
  button: {
    height: '58px',
  },
  deleteButton: {
    width: '420px',
    marginLeft: 'auto',
    backgroundColor: 'transparent',
    border: '1px solid white',
    borderRadius: '4px',
    textDecoration: 'none',
    padding: theme.spacing(2),
    display: 'flex',
    alignSelf: 'center',
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      marginTop: '16px',
    },
  },
  link: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: theme.palette.primary.main,
  },
  buttonIcon: {
    marginRight: theme.spacing(2),
    padding: 0,
  },
}))
