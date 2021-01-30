import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { useLocation, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const classes = useStyles();
  const initState = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  };
  const [newUser, setNewUser] = useState(initState);
  const newStudent = {
    course: courseID,
    school: schoolID,
    role: 2,
  };

  /**
   * @var {String} emailID used to inform the server if it is a teacher or student registering
   * */

  useEffect(() => {
    if (emailID) {
      setNewUser({ email: emailID });
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const registerUser = (event) => {
    event.preventDefault();
    if (props.studentReg) {
      //merges the new user info with the info we get from the email page if they got invited by a teacher
      const mergeInfo = { ...newUser, ...newStudent };
      dispatch({ type: 'ADD_STUDENT_NEWREG', payload: mergeInfo });
      history.push('/home');
    } else if (!emailID) {
      dispatch({
        type: 'REGISTER',
        payload: {
          email: newUser.email,
          password: newUser.password,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
        },
      });
      history.push('/home');
    }
  };

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
        </Typography>
        {errors.registrationMessage && (
          <p className='alert' role='alert'>
            {errors.registrationMessage}
          </p>
        )}
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
