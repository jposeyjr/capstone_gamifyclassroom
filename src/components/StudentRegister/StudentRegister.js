import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Link, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

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
