import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';

export default makeStyles((theme) => ({
  headerArea: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3),
    fontSize: '1.8em',
    [theme.breakpoints.up('md')]: {
      fontSize: '3em',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '3.6em',
    },
  },
  btnArea: {
    display: 'flex',
    width: '100%',
    padding: 0,
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%',
  },
  textArea: {
    margin: theme.spacing(2),
  },
  submit: {
    backgroundColor: theme.status.submit,
    color: theme.palette.text.primary,
    borderRadius: 40,
    minHeight: 15,
    maxHeight: 30,
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
