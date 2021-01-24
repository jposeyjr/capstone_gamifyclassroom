import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { useLocation } from 'react-router-dom';
import {
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './styles';

const RegisterForm = (props) => {
  const location = useLocation();
  const schoolID = new URLSearchParams(location.search).get('school');
  const courseID = new URLSearchParams(location.search).get('course');
  const emailID = new URLSearchParams(location.search).get('email');
  const errors = useSelector((store) => store.errors);
  const [showPass, setPass] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const initState = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  };
  const [newUser, setNewUser] = useState(initState);
  const [newStudent, setStudent] = useState({
    course: courseID,
    school: schoolID,
    role: 2,
  });

  useEffect(() => {
    if (emailID) {
      setNewUser({ email: emailID });
    }
  }, [location]);

  const registerUser = (event) => {
    event.preventDefault();

    if (props.studentReg) {
      const mergeInfo = { ...newUser, ...newStudent };
      dispatch({ type: 'ADD_STUDENT', payload: mergeInfo });
    } else if (!emailID) {
      dispatch({
        type: 'REGISTER',
        payload: {
          newUser,
        },
      });
    }
  }; // end registerUser

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete='off'
      onSubmit={registerUser}
    >
      <div className={classes.textArea}>
        <Typography variant='h4' component='h2' className={classes.headerArea}>
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
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          label='Email'
        />
        <TextField
          value={newUser.first_name}
          fullWidth
          required
          onChange={(e) =>
            setNewUser({ ...newUser, first_name: e.target.value })
          }
          label='First Name'
        />
        <TextField
          value={newUser.last_name}
          fullWidth
          required
          onChange={(e) =>
            setNewUser({ ...newUser, last_name: e.target.value })
          }
          label='Last Name'
        />
        <FormControl fullWidth required>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input
            id='password'
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
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
  );
};

export default connect(mapStoreToProps)(RegisterForm);