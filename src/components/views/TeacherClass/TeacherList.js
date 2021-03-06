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
  root: {
    overflowY: 'hidden',
    maxWidth: 1280,
    width: '100%',
  },
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
  const students = useSelector((store) => store.student);

  useEffect(() => {
    //turns on sockets when they get to the class page and attaches it to the endpoint
    socketRef.current = socketClient();
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

  /**
   * Takes in an object from the clicked on student card
   * @param {Object} id holds all students info from the currently selected student
   * @param {Boolean} edit signifies if they have chosen to edit the student, if so it opens a modal
   * @param {Boolean} removeStudent signifies if they have chosen to remove a student, if so it confirm they want to delete it
   * @param {Boolean} multi signifies if they are trying to send more than one student a point at a time
   * If not then we send a single point to that student
   * */

  const handleClick = (e, id) => {
    const selectedStudent = id.student_id;
    const firstName = id.first_name;
    dispatch({ type: 'GET_SELECT_STUDENT', payload: selectedStudent });
    if (edit && !removeStudent) {
      handleOpen();
    }
    if (edit && removeStudent) {
      Swal.fire('Please turn off other edit or remove mode!');
    }
    if (removeStudent && id !== undefined && !edit) {
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

  /**
   * Takes in the name and id from the current student or students if MULTI is true
   * @param {String} name holds the students first name
   * @param {Number} id holds selected students id
   * Sends message to socket for it to appear on every students screen (excludes the teacher) and refreshes the points
   * */

  const sendPoints = (name, id) => {
    let message = `${name} got 1 point!`;
    socketRef.current.emit('newMessage', { message });
    dispatch({ type: 'GET_POINT_STUDENT', payload: id });
    dispatch({ type: 'GET_STUDENTS', payload: Number(courseID) });
  };

  const handleDelete = () => {
    if (!edit) {
      setRemoveStudent(!removeStudent);
    } else {
      Swal.fire('Please turn off edit mode first!');
    }
  };

  //needed to delay the send by the time it is set to display on the students page
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  /**
   * Used to send more than one student a point at time, delays the message to allow each student to see who got one
   * Will trigger a visual progression bar to appear to info the teacher that it is working
   * @param {Boolean} setSendMulti enables the progress bar to display
   * @param {TimerHandler} timer allows enough time for the student message to disappear before sending the next one
   * Empties the array and turns multi and sendmulti to false to disable selections
   * */
  const sendMultiPoints = async () => {
    setSendMulti(true);
    //used to remove any possible duplicates in the student array
    let uniqueOnly = [...new Set(studentArray)];
    for (let eachStudent of uniqueOnly) {
      sendPoints(eachStudent.first_name, eachStudent.student_id);
      await timer(2200);
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
        <Box width='90%'>
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
          onClick={() => {
            !removeStudent
              ? setEdit(!edit)
              : Swal.fire('Please turn off remove mode first!');
          }}
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
      <Grid container spacing={1} justify='center' className={classes.root}>
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
