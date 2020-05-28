import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  inputs: {
    margin: 'auto auto',
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
    height: '58px',
    backgroundColor: 'transparent',
    border: '1px solid white',
    borderRadius: '4px',
    textDecoration: 'none',
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    display: 'flex',
    alignSelf: 'center',

    [theme.breakpoints.down('sm')]: {
      marginTop: '16px',
    },
  },
  link: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: theme.palette.primary.main,
    margin: 'auto',
  },
  buttonIcon: {
    marginRight: theme.spacing(2),
    padding: 0,
  },
  card: {
    padding: theme.spacing(2),
    borderRadius: '8px',
    border: '1px solid white',
    marginBottom: '16px',
  },
  img: {
    objectFit: 'contain',
    width: '60px',
    margin: '5px auto',
  },
  imageCard: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid white',
  },
  addButton: {
    marginTop: 16,
    marginLeft: 8,
  },
}))
