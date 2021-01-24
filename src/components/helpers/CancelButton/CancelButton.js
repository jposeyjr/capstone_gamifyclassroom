import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cancel: {
    backgroundColor: theme.status.danger,
    color: theme.palette.text.primary,
    borderRadius: 40,
    minHeight: 15,
    maxHeight: 30,
    padding: '0 1em',
    '&:hover': {
      backgroundColor: theme.status.secondary,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
    '&:focus': {
      backgroundColor: theme.status.secondary,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: theme.status.secondary,
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
    },
  },
}));

const CancelButton = (props) => {
  const classes = useStyles();
  return (
    <Button className={classes.cancel} onClick={props.handleCancel}>
      Cancel
    </Button>
  );
};

export default CancelButton;
