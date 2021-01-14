import { makeStyles } from '@material-ui/core/styles';

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: 'flex',
    margin: '0 10px',
    justifyContent: 'space-between',
  },
  cancel: {
    backgroundColor: theme.status.danger,
    color: theme.palette.text.primary,
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
}));
