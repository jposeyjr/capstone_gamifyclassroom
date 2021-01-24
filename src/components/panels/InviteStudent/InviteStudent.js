import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Modal, TextField, Button, Box } from '@material-ui/core';
import SubmitButton from '../../helpers/SubmitButton/SubmitButton';
import CancelButton from '../../helpers/CancelButton/CancelButton';
import globalUseStyles from '../../helpers/globalUseStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));
//used to set modal location on page taken from Mat-UI example
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

//used to set modal location on page taken from Mat-UI example
function getModalStyle() {
  const top = 30 + rand();
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
  const globalClass = globalUseStyles();
  const location = useLocation();
  const [modalStyle] = useState(getModalStyle);
  const [emailData, setEmailData] = useState('');

  //on click of submit dispatch the data from state to saga to send out email from backend
  const handleSubmit = (e) => {
    const urlID = new URLSearchParams(location.search).get('classid');
    const studentInfo = { courseID: urlID, studentEmail: emailData };
    e.preventDefault();
    dispatch({ type: 'INVITE_STUDENT', payload: studentInfo });
    setOpen(false);
  };

  //closes the modal and clears student state info
  const handleCancel = () => {
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
        className={globalClass.button}
        color='primary'
        onClick={handleOpen}
      >
        Invite Student
      </Button>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={isOpen}
        onClose={handleCancel}
      >
        <div style={modalStyle} className={globalClass.paper}>
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

            <Box className={globalClass.btnArea}>
              <SubmitButton />
              <CancelButton handleCancel={handleCancel} />
            </Box>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddStudentModal;
