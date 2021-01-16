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
    backgroundColor: 'transparent',
    width: 550,
    padding: 30,
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
  cancel: {
    backgroundColor: theme.status.danger,
    color: theme.palette.text.primary,
    borderRadius: 40,
    minHeight: 39,
    maxHeight: 39,
    padding: '0 1em',
    '&:hover': {
      backgroundColor: theme.status.secondary,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
    '&:focus': {
      backgroundColor: theme.status.secondary,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: theme.status.secondary,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
  },
  submit: {
    backgroundColor: theme.status.submit,
    color: theme.palette.text.primary,
    borderRadius: 40,
    minHeight: 39,
    maxHeight: 39,
    padding: '0 1em',
    '&:hover': {
      backgroundColor: theme.status.back,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
    '&:focus': {
      backgroundColor: theme.status.back,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: theme.status.nack,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
  },
}));
