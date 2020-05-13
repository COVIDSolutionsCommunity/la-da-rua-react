import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  img: {
		width: '250px',
    height: '346px',
    '&:hover': {
      opacity: 0.6,
    },
  },
  section: {
    position: 'relative',
    zIndex: '2',
    width: '250px',
    height: '346px',
    backgroundColor: 'black',
  },
  button: {
    position: 'absolute',
    zIndex: 3,
    top: '40%',
    width: '100%',
    color: 'white',
    padding: '12px',
    textTransform: 'uppercase',
    textAlign: 'center',
    boxSizing: 'border-box',
    fontSize: 32,
	},
	pink: {
		backgroundColor: theme.palette.custom.pink,
	},
	green: {
		backgroundColor: theme.palette.custom.green,
	},
	blue: {
		backgroundColor: theme.palette.custom.blue,
	},
	yellow: {
		backgroundColor: theme.palette.custom.yellow,
	},
}))
