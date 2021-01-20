import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Box, Button, Grid } from '@material-ui/core';
import useStyles from './styles';

const RegisterForm = () => {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();
  const initState = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  const [newUser, setNewUser] = useState(initState);

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  }; // end registerUser

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={12}>
        <form
          className={classes.form}
          noValidate
          autoComplete='off'
          onSubmit={registerUser}
        >
          <div className={classes.textArea}>
            <Typography
              variant='h4'
              component='h2'
              className={classes.headerArea}
            >
              Register User
              {errors.registrationMessage && (
                <h3 className='alert' role='alert'>
                  {errors.registrationMessage}
                </h3>
              )}
            </Typography>
            <TextField
              value={newUser.email}
              fullWidth
              required
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              label='Email'
            />
            <TextField
              value={newUser.firstName}
              fullWidth
              required
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              label='First Name'
            />
            <TextField
              value={newUser.lastName}
              fullWidth
              required
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              label='Last Name'
            />
            <TextField
              value={newUser.password}
              fullWidth
              required
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              label='Password'
              type='password'
            />
          </div>
          <Box className={classes.btnArea}>
            <Button className={classes.submit} type='submit'>
              Submit
            </Button>
            <Button
              className={classes.cancel}
              onClick={() => setNewUser(initState)}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
