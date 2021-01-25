import { makeStyles } from '@material-ui/core';
const globalUseStyles = makeStyles((theme) => ({
  btnArea: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: theme.spacing(1),
  },
  input: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: '10px 10px 12px 5px rgba(0,0,0,0.56)',
    padding: theme.spacing(2, 4, 3),
  },
  contentWrapper: {
    maxWidth: 1280,
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.background.default,
    margin: theme.spacing(1),
  },
  headerArea: {
    display: 'flex',
    justifyContent: 'center',
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
  groot: {
    width: '100%',
    maxWidth: 1750,
    margin: theme.spacing(1),
    overflow: 'hidden',
    padding: 10,
  },
}));

export default globalUseStyles;
