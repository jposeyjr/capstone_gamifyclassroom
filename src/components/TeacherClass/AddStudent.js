import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Modal, TextField, Button, Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
  const teacher = useSelector((store) => store.user.id);
  const students = useSelector((store) => store.student);

  const [studentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    start_date: new Date('2019-12-02T11:11:11'),
    avatar: '',
    course: students[0]?.course,
    teacher: teacher,
  });

  useEffect(() => {
    let courseID = students[0]?.course;
    setStudentData({ ...studentData, course: courseID });
  }, [students]);

  //on click of submit dispatch the data from state added to the form fields to get the student added to the db
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_STUDENT', payload: studentData });
    setOpen(false);
  };

  //closes the modal and clears student state info
  const handleClose = () => {
    setOpen(false);
    setStudentData('');
  };

  //changes state to allow the modal to open
  const handleOpen = () => {
    setOpen(true);
  };

  //TODO will be used to select pre-chosen avatars
  const handleAvatar = () => {
    console.log('why');
  };

  return (
    <div>
      <Button
        variant='contained'
        className={classes.button}
        color='primary'
        onClick={handleOpen}
      >
        Add Student
      </Button>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={isOpen}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Add Student</h2>
          <form
            className={classes.form}
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            autoComplete='off'
          >
            <TextField
              color='secondary'
              value={studentData.first_name}
              fullWidth
              onChange={(e) =>
                setStudentData({ ...studentData, first_name: e.target.value })
              }
              label='First Name'
            />
            <TextField
              value={studentData.last_name}
              fullWidth
              onChange={(e) =>
                setStudentData({ ...studentData, last_name: e.target.value })
              }
              label='Last Name'
            />
            <TextField
              value={studentData.email}
              fullWidth
              onChange={(e) =>
                setStudentData({ ...studentData, email: e.target.value })
              }
              label='Email'
            />
            <TextField
              value={studentData.password}
              fullWidth
              className={classes.input}
              onChange={(e) =>
                setStudentData({ ...studentData, password: e.target.value })
              }
              label='Password'
            />
            <Box className={classes.btnArea}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleAvatar}
              >
                Avatar
              </Button>
            </Box>
            <TextField
              value={studentData.avatar}
              fullWidth
              onChange={(e) =>
                setStudentData({ ...studentData, avatar: e.target.value })
              }
              label='Image URL'
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                fullWidth
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='Start Date'
                value={studentData.start_date}
                onChange={(date) =>
                  setStudentData({ ...studentData, start_date: date })
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
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
