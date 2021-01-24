import React, { useEffect, useState, useRef } from 'react';
import TeacherClass from '../../panels/TeacherClass/TeacherClass';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AddStudent from '../../panels/TeacherModals/AddStudent';
import EditStudent from '../../panels/TeacherModals/EditStudent';
import CancelButton from '../../helpers/CancelButton/CancelButton';
import InviteStudent from '../../panels/InviteStudent/InviteStudent';
import socketClient from 'socket.io-client';
import {
  Grid,
  Typography,
  Button,
  LinearProgress,
  Box,
} from '@material-ui/core';
import Swal from 'sweetalert2';
import globalUseStyles from '../../helpers/globalUseStyles';
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

const TeacherList = () => {
  const [edit, setEdit] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [removeStudent, setRemoveStudent] = useState(false);
  const [multi, setMulti] = useState(false);
  const [sendMulti, setSendMulti] = useState(false);
  const [className, setName] = useState('');
  const [courseID, setCourse] = useState('');
  const [studentArray, setStudentArray] = useState([]);
  const classes = useStyles();
  const globalClass = globalUseStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const socketRef = useRef();
  const endpoint = 'http://localhost:5000';
  const students = useSelector((store) => store.student);

  useEffect(() => {
    //turns on sockets when they get to the class page and attaches it to the endpoint
    socketRef.current = socketClient(endpoint);
    //grabs info from url to keep page on refresh
    const urlID = new URLSearchParams(location.search).get('classid');
    setCourse(urlID);
    const courseName = new URLSearchParams(location.search).get('course');
    setName(courseName);
    dispatch({ type: 'GET_STUDENTS', payload: Number(urlID) });
    return () => {
      socketRef.current.disconnect();
    };
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  //changes state of open to close the modal
  const handleClose = () => {
    setOpen(false);
    dispatch({ type: 'GET_STUDENTS', payload: Number(courseID) });
  };

  //changes state of open to true to open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  //this will be used to get the current student than it will call the point reducer to get current selected students info and points
  const handleClick = (e, id) => {
    //checking if it is edit mode if so change open to true so the pop up opens when clicked,
    //if not it will send points, or remove student
    const selectedStudent = id.student_id;
    const firstName = id.first_name;
    dispatch({ type: 'GET_SELECT_STUDENT', payload: selectedStudent });
    if (edit) {
      handleOpen();
    }
    if (removeStudent && id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this students info!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'You have removed the student from the class.',
            'success'
          );
          dispatch({ type: 'DELETE_STUDENT', payload: selectedStudent });
          dispatch({ type: 'GET_STUDENTS', payload: Number(courseID) });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your student is still in the class. :)',
            'error'
          );
        }
      });
    }
    if (edit === false && removeStudent === false && multi === false) {
      sendPoints(firstName, selectedStudent);
    }

    if (multi) {
      setStudentArray([...studentArray, id]);
    }
  };

  //handles sending the message via sockets to all students but not the teacher, then dispatches to adjust DB
  const sendPoints = (name, id) => {
    let message = `${name} got 1 point!`;
    socketRef.current.emit('newMessage', { message });
    dispatch({ type: 'GET_POINT_STUDENT', payload: id });
    dispatch({ type: 'GET_STUDENTS', payload: Number(courseID) });
  };

  const handleDelete = () => {
    setRemoveStudent(!removeStudent);
  };

  //needed to delay the send by the time it is set to display on the students page
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  //using async and await to delay sending points for each student to correspond with the pop up timeout on student page
  const sendMultiPoints = async () => {
    setSendMulti(true);
    //used to remove any possible duplicates in the student array
    let uniqueOnly = [...new Set(studentArray)];
    for (let eachStudent of uniqueOnly) {
      sendPoints(eachStudent.first_name, eachStudent.student_id);
      await timer(1900);
    }
    setMulti(false);
    setStudentArray([]);
    setSendMulti(false);
  };

  const handleCancel = () => {
    setMulti(false);
    setStudentArray([]);
  };

  return (
    <div className={globalClass.contentWrapper}>
      <div className={globalClass.headerArea}>
        <Typography variant='h3' component='h1'>
          {removeStudent
            ? 'Select a student to remove'
            : edit
            ? 'Select a student to edit'
            : sendMulti
            ? 'Sending points please wait....'
            : multi
            ? 'Select multiple students'
            : className}
        </Typography>
      </div>
      {sendMulti ? (
        <Box width='100%'>
          <LinearProgress
            variant='indeterminate'
            style={{ borderRadius: 10, backgroundColor: '#FFF' }}
          />
        </Box>
      ) : null}
      <div className={globalClass.btnArea}>
        {multi ? (
          <>
            <Button
              className={classes.submit}
              onClick={() => sendMultiPoints()}
              type='submit'
            >
              Submit
            </Button>
            <CancelButton handleCancel={handleCancel} />
          </>
        ) : (
          <Button
            variant='contained'
            color='primary'
            onClick={() => setMulti(!multi)}
          >
            Select Students
          </Button>
        )}
        <AddStudent />
        <Button
          variant='contained'
          color='primary'
          onClick={() => setEdit(!edit)}
        >
          Edit Student
        </Button>
        <Button variant='contained' onClick={handleDelete} color='primary'>
          Remove Student
        </Button>
        <InviteStudent
          isOpen={isOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <EditStudent
          isOpen={isOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div>
      <Grid container spacing={3}>
        {students.map((student, i) => (
          <Grid key={i} item xs={12} sm={2} md={2}>
            <TeacherClass
              student={student}
              multi={multi}
              handleClick={handleClick}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TeacherList;
