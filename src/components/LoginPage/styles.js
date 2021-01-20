import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';
export default makeStyles((theme) => ({
  root: {
    maxWidth: 1280,
    width: '100%',
    margin: theme.spacing(1),
    overflow: 'hidden',
    padding: 10,
  },
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    width: 480,
    borderRadius: 15,
    boxShadow: '10px 10px 12px 5px rgba(0,0,0,0.56)',
  },
  linkArea: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  loginLink: {
    color: theme.palette.text.primary,
    fontSize: '1em',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      color: '#d41ce8',
    },
  },
  submit: {
    backgroundColor: theme.status.submit,
    color: theme.palette.text.primary,
    borderRadius: 40,
    minHeight: 15,
    maxHeight: 30,
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
