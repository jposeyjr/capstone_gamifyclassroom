import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Typography,
  Button,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './styles';

const LoginPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const errors = useSelector((redux) => redux.errors);
  const [user, setUser] = useState({ email: '', password: '' });
  const [showPass, setPass] = useState(false);
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
          <FormControl fullWidth required>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              id='password'
              value={user.password}
              onChange={handleInputChangeFor('password')}
              type={showPass ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Toggle password visibility'
                    onClick={() => setPass(!showPass)}
                  >
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
