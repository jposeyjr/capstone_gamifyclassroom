import React, { useEffect, useState, useRef } from 'react';
import TeacherClass from './TeacherClass';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import InviteStudent from './InviteStudent';
import socketClient from 'socket.io-client';
import useStyles from './styles';
import Swal from 'sweetalert2';
import { Grid, Typography, Button } from '@material-ui/core';

const TeacherList = () => {
  const [edit, setEdit] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [removeStudent, setRemoveStudent] = useState(false);
  const [multi, setMulti] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const students = useSelector((store) => store.student);
  const [className, setName] = useState('');
  const [courseID, setCourse] = useState('');
  const [studentArray, setStudentArray] = useState([]);
  const endpoint = 'http://localhost:5000';
  const socketRef = useRef();

  //when the component 'mounts' it will get the ID and name of course from the URL to persist after reloads
  useEffect(() => {
    socketRef.current = socketClient(endpoint);
    const urlID = new URLSearchParams(location.search).get('classid');
    setCourse(urlID);
    const courseName = new URLSearchParams(location.search).get('course');
    setName(courseName);
    //with that information it will set the name and get students for the current course this allows teachers to bookmark classes
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
    //checking if it is edit mode if so change open to true so the pop up opens when clicked, if not it will send points, or remove student
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
  //TODO look into emitting to just that student maybe? clarify with client on preference
  const sendPoints = (name, id) => {
    let message = `${name} got 1 point!`;
    socketRef.current.emit('newMessage', { message });
    dispatch({ type: 'GET_POINT_STUDENT', payload: id });
    dispatch({ type: 'GET_STUDENTS', payload: Number(courseID) });
  };

  //adds the option to remove students from DB with a dispatch based on student that is clicked.
  const handleDelete = () => {
    setRemoveStudent(!removeStudent);
  };

  //used to allow us to send multiple points but each student gets the ability to see the points got given
  //need to delay the send by the time it is set to display on the students page
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  //using async and await to delay sending points for each student to correspond with the pop up timeout on student page
  const sendMultiPoints = async () => {
    //used to remove any possible duplicates in the student array
    let uniqueOnly = [...new Set(studentArray)];
    for (let eachStudent of uniqueOnly) {
      sendPoints(eachStudent.first_name, eachStudent.student_id);
      await timer(1900);
    }
    setMulti(false);
    setStudentArray([]);
  };

  const handleCancel = () => {
    setMulti(false);
    setStudentArray([]);
  };

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.headerArea}>
        <Typography variant='h3' component='h1'>
          {removeStudent
            ? 'Select a student to remove'
            : !edit
            ? className
            : 'Select a student to edit'}
        </Typography>
      </div>
      <div className={classes.btnArea}>
        {multi ? (
          <>
            <Button
              className={classes.submit}
              onClick={() => sendMultiPoints()}
              type='submit'
            >
              Submit
            </Button>
            <Button className={classes.cancel} onClick={() => handleCancel()}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant='contained'
            className={classes.button}
            color='primary'
            onClick={() => setMulti(!multi)}
          >
            Select Students
          </Button>
        )}
        <AddStudent />
        <Button
          variant='contained'
          className={classes.button}
          onClick={handleDelete}
          color='primary'
        >
          Remove Student
        </Button>
        <Button
          variant='contained'
          className={classes.button}
          color='primary'
          onClick={() => setEdit(!edit)}
        >
          Edit Student
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
