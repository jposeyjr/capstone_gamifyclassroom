import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, TextField, Button, Box } from '@material-ui/core';
import useStyles from './styles';

//used to set modal location on page taken from Mat-UI example
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

//used to set modal location on page taken from Mat-UI example
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const AddStudentModal = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [emailData, setEmailData] = useState('');

  //on click of submit dispatch the data from state added to the form fields to get the student added to the db
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'INVITE_STUDENT', payload: emailData });
    setOpen(false);
  };

  //closes the modal and clears student state info
  const handleClose = () => {
    setOpen(false);
    setEmailData('');
  };

  //changes state to allow the modal to open
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        variant='contained'
        className={classes.button}
        color='primary'
        onClick={handleOpen}
      >
        Invite Student
      </Button>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={isOpen}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Invite Student</h2>
          <form
            className={classes.form}
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            autoComplete='off'
          >
            <TextField
              color='secondary'
              value={emailData}
              fullWidth
              onChange={(e) => setEmailData(e.target.value)}
              label='Email'
            />

            <Box className={classes.btnArea}>
              <Button className={classes.submit} type='submit'>
                Submit
              </Button>
              <Button className={classes.cancel} onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddStudentModal;
