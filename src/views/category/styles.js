import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  content: {
    margin: '60px',
    width: '80vw',
  },
  cards: {
    margin: '30px 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto',
    gridGap: '16px',

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  input: {
    margin: '0 40px',
  },
  icon: {
    marginBottom: '10px',
  },
  center: {
    textAlign: 'center',
  },
}))
