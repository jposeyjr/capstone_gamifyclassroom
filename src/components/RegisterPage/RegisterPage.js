import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import mapStoreToProps from '../../redux/mapStoreToProps';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

const useStyles = makeStyles((theme) => ({
  submit: {
    backgroundColor: theme.status.submit,
    color: theme.palette.text.primary,
    borderRadius: 40,
    minHeight: 39,
    maxHeight: 39,
    padding: '0 1em',
    '&:hover': {
      backgroundColor: theme.status.back,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
    '&:focus': {
      backgroundColor: theme.status.back,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: theme.status.nack,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
  },
}));
class RegisterPage extends Component {
  render() {
    const classes = useStyles();
    return (
      <div>
        <RegisterForm />
        <center>
          <Button
            className={classes.submit}
            type='button'
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </Button>
          {/* <button
            type='button'
            className='btn btn_asLink'
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </button> */}
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
