import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    backgroundColor: theme.status.submit,
    color: theme.palette.text.primary,
    borderRadius: 40,
    minHeight: 15,
    maxHeight: 30,
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

const SubmitButton = () => {
  const classes = useStyles();
  return (
    <Button className={classes.submit} type='submit'>
      Submit
    </Button>
  );
};

export default SubmitButton;
