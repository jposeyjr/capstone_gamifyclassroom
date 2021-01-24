import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, TextField, Button, Box } from '@material-ui/core';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
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

const EditStudent = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const teacher = useSelector((store) => store.user.id);
  const course = useSelector((store) => store.course);
  const studentInfo = useSelector((store) => store.selectStudent);
  const initState = {
    first_name: '',
    last_name: '',
    email: '',
    start_date: new Date('2019-12-02T11:11:11'),
    avatar: '',
    course_id: course.id,
    teacher: teacher,
    id: 0,
  };
  const [studentData, setStudentData] = useState(initState);

  //will set the state to the currently selected student when we have that info
  //TODO make a point reducer to hold that info and try to make this DRY
  useEffect(() => {
    if (props.isOpen) {
      setStudentData((studentData) => ({
        ...studentData,
        first_name: studentInfo.first_name,
      }));
      setStudentData((studentData) => ({
        ...studentData,
        id: studentInfo.id,
      }));
      setStudentData((studentData) => ({
        ...studentData,
        last_name: studentInfo.last_name,
      }));
      setStudentData((studentData) => ({
        ...studentData,
        avatar: studentInfo.avatar,
      }));
      setStudentData((studentData) => ({
        ...studentData,
        start_date: studentInfo.start_date,
      }));
      setStudentData((studentData) => ({
        ...studentData,
        email: studentInfo.email,
      }));
    }
  }, [studentInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  //on submit will dispatch the student info that was edited to a PUT route to update that info in the DB
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'EDIT_STUDENT', payload: studentData });
    close();
  };

  //used to close the modal and clear student state info
  const close = () => {
    props.handleClose();
    setStudentData(initState);
  };

  //used to close the avatar dialog and set the state to the selected avatar image
  const handleAvatarClose = (img) => {
    setAvatarOpen(false);
    setStudentData({ ...studentData, avatar: img });
  };

  //used to open the avatar dialog
  const handleAvatar = () => {
    setAvatarOpen(true);
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
              value={studentData?.first_name || ''}
              fullWidth
              onChange={(e) =>
                setStudentData({ ...studentData, first_name: e.target.value })
              }
              label='First Name'
            />
            <TextField
              value={studentData?.last_name || ''}
              fullWidth
              onChange={(e) =>
                setStudentData({ ...studentData, last_name: e.target.value })
              }
              label='Last Name'
            />
            <TextField
              value={studentData?.email || ''}
              fullWidth
              onChange={(e) =>
                setStudentData({ ...studentData, email: e.target.value })
              }
              label='Email'
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
              value={studentData.avatar || ''}
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
                value={
                  studentData.start_date || new Date('2019-12-02T11:11:11')
                }
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
