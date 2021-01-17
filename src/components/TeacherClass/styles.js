import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';

export default makeStyles((theme) => ({
  contentWrapper: {
    maxWidth: 1280,
    width: '100%',
    background: theme.palette.background.default,
    margin: theme.spacing(1),
  },
  headerArea: {
    display: 'flex',
    justifyContent: 'center',
  },
  btnArea: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: theme.spacing(1),
  },
  button: {
    color: theme.palette.text.primary,
    borderRadius: 40,
    minHeight: 39,
    maxHeight: 39,
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
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  atnArea: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  card: {
    display: 'flex',
    maxWidth: 245,
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  input: {
    marginBottom: theme.spacing(3),
  },
  avatar: {
    maxHeight: 200,
    height: '100%',
    objectFit: 'unset',
  },
  media: {
    width: '100%',
    paddingTop: '56.25%',
  },
  cardActions: {
    display: 'flex',
    margin: '0 10px',
    justifyContent: 'space-between',
  },
  textArea: {
    margin: theme.spacing(2),
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
