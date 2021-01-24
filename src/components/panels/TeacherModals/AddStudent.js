import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Modal, TextField, Button, Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AvatarSelector from '../../helpers/AvatarSelector/AvatarSelector';
import SubmitButton from '../../helpers/SubmitButton/SubmitButton ';
import CancelButton from '../../helpers/CancelButton/CancelButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnArea: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: theme.spacing(1),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #FFFFFF',
    boxShadow: '10px 10px 12px 5px rgba(0,0,0,0.56)',
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  input: {
    marginBottom: theme.spacing(3),
  },
}));

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
  const [avatarOpen, setAvatarOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const teacher = useSelector((store) => store.user.id);
  const location = useLocation();

  const [studentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    start_date: new Date('2019-12-02T11:11:11'),
    avatar: '',
    course: 0,
    teacher: teacher,
  });

  useEffect(() => {
    const urlID = new URLSearchParams(location.search).get('classid');
    setStudentData({ ...studentData, course: urlID });
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  //on click of submit dispatch the data from state added to the form fields to get the student added to the db
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_STUDENT', payload: studentData });
    setOpen(false);
  };

  //closes the modal and clears student state info
  const handleCancel = () => {
    setOpen(false);
    setStudentData('');
  };

  //changes state to allow the modal to open
  const handleOpen = () => {
    setOpen(true);
  };

  const handleAvatarClose = (img) => {
    setAvatarOpen(false);
    setStudentData({ ...studentData, avatar: img });
  };

  //TODO will be used to select pre-chosen avatars
  const handleAvatar = () => {
    setAvatarOpen(true);
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Add Student
      </Button>
      <Modal
        aria-labelledby='add student modal pop-up'
        aria-describedby='pop-up form to add students to class'
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
              <AvatarSelector
                avatarOpen={avatarOpen}
                handleAvatarClose={handleAvatarClose}
              />
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
