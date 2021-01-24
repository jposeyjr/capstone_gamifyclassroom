import React from 'react';
import { Link, Grid, Typography } from '@material-ui/core';
import useStyles from './styles';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container spacing={6} justify='center'>
      <Grid item xs={12} sm={12} md={6}>
        <Typography variant='h2' component='h1' className={classes.headerArea}>
          Welcome
        </Typography>
        <Typography variant='body1' component='p' className={classes.textArea}>
          Gamified classrooms allow teachers to easily and quickly reward
          students for participating in the classroom, keep track of all
          students and activity levels throughout one or many classrooms. The
          gamified classroom is aimed to be quick, simple, and easy with limited
          intrusiveness to allow for quick approval by parents and school
          boards.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <div className={classes.textArea}>
          <RegisterForm />
          <center>
            <h4>Already a Member?</h4>
            <Link
              role='link'
              underline='always'
              className={classes.loginLink}
              type='button'
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </Link>
          </center>
        </div>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
