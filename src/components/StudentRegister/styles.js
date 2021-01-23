import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(1),
    overflow: 'hidden',
    padding: 10,
  },
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    width: 450,
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
    fontSize: '1.7em',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      color: '#d41ce8',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
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
