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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
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
}));

export default globalUseStyles;
