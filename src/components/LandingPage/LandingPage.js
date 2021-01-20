import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import useStyles from './styles';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Typography variant='h2' component='h1' className={classes.textArea}>
          Welcome
        </Typography>
        <Typography variant='body1' component='p' className={classes.textArea}>
          Gamified classrooms allow teachers to easily and quickly reward
          students for participating in the classroom and keep track of all
          students and activity levels throughout one or many classrooms. The
          gamified classroom is aimed to be quick, simple, and easy with limited
          intrusiveness to allow for quick approval by parents and school boards
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <div className={classes.textArea}>
          <RegisterForm />
          <center>
            <h4>Already a Member?</h4>
            <Button
              className={classes.loginBtn}
              type='button'
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </Button>
          </center>
        </div>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
