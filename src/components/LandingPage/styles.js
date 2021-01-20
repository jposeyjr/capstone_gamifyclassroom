import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  headerArea: {
    margin: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      fontSize: '3em',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '3.6em',
    },
  },
  textArea: {
    margin: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      fontSize: '1.8em',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '2.4em',
    },
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
}));
