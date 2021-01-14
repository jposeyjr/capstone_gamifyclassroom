import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, TextField, Button, Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useStyles from './styles';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const EditStudent = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const teacher = useSelector((store) => store.user.id);
  const course = useSelector((store) => store.course);
  const [studentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    start_date: new Date('2019-12-02T11:11:11'),
    avatar: '',
    course_id: course.id,
    teacher: teacher,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'EDIT_STUDENT', payload: studentData });
    console.log('clicked');
    close();
  };

  const close = () => {
    props.handleClose();
    setStudentData('');
  };

  const handleAvatar = () => {
    console.log('why');
  };

  return (
    <div>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={props.isOpen}
        onClose={close}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Edit Student</h2>
          <form
            className={classes.root}
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            autoComplete='off'
          >
            <TextField
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
              <Button type='submit' className={classes.submit}>
                Submit
              </Button>
              <Button onClick={close} className={classes.cancel}>
                Cancel
              </Button>
            </Box>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditStudent;
