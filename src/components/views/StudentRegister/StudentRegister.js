import React from 'react';
import RegisterForm from '../../panels/RegisterForm/RegisterForm';
import { Link, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

const StudentRegister = () => {
  const history = useHistory();
  const studentReg = true;
  const classes = useStyles();
  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={12} sm={4} className={classes.wrapper}>
        <RegisterForm studentReg={studentReg} />
        <div className={classes.linkArea}>
          <Link
            color='inherit'
            component='button'
            role='link'
            underline='always'
            className={classes.loginLink}
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default StudentRegister;
