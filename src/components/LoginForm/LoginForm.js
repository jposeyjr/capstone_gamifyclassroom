import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Typography, Box, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
const LoginPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const errors = useSelector((redux) => redux.errors);
  const [user, setUser] = useState({ email: '', password: '' });

  const login = (event) => {
    event.preventDefault();
    const { email, password } = user;

    if (email && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          email,
          password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  const handleInputChangeFor = (propertyName) => (event) => {
    console.log(propertyName);
    setUser({
      ...user,
      [propertyName]: event.target.value,
    });
  };

  return (
    <div>
      {errors.loginMessage && (
        <h2 className='alert' role='alert'>
          {errors.loginMessage}
        </h2>
      )}
      <form
        className={classes.form}
        noValidate
        autoComplete='off'
        onSubmit={login}
      >
        <div className={classes.textArea}>
          <Typography
            variant='h4'
            component='h2'
            className={classes.headerArea}
          >
            Login
          </Typography>
          <TextField
            fullWidth
            required
            value={user.email}
            onChange={handleInputChangeFor('email')}
            label='Email'
          />
          <TextField
            fullWidth
            required
            name='password'
            value={user.password}
            onChange={handleInputChangeFor('password')}
            type='password'
            label='First Name'
          />
        </div>
        <div className={classes.btnArea}>
          <Button className={classes.submit} type='submit'>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
