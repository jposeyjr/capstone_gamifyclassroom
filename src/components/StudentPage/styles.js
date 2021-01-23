import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';

export default makeStyles((theme) => ({
  headerArea: {
    display: 'flex',
    justifyContent: 'center',
  },
  imgHolder: {
    maxWidth: 250,
  },
  imgWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textArea: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  paper: {
    fontSize: '2em',
    boxShadow: 'none',
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.primary,
    width: 550,
    padding: 30,
    border: '.5px solid #bf463d',
    margin: theme.spacing(1),
  },
  btnArea: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
  },
  button: {
    color: theme.palette.text.primary,
    borderRadius: 40,
    padding: '0 1em',
    boxShadow: shadows[0],
    '&:hover': {
      boxShadow: shadows[0],
    },
    '&:active': {
      boxShadow: shadows[0],
    },
    '&:focus': {
      boxShadow: shadows[0],
    },
  },
}));
