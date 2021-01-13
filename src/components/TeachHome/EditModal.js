import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, TextField, Button, Grid } from '@material-ui/core';
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

const EditModal = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const teacher = useSelector((store) => store.user.id);
  const course = useSelector((store) => store.course);
  const [classData, setClassData] = useState({
    className: '',
    inviteCoteacher: '',
    teacher_id: teacher,
    startDate: new Date('2019-12-02T11:11:11'),
    endDate: new Date('2019-12-03T12:12:12'),
    id: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'EDIT_CLASS',
      payload: classData,
    });
  };

  useEffect(() => {
    if (props.isOpen) {
      setClassData((classData) => ({
        ...classData,
        className: course.course_name,
      }));
      setClassData((classData) => ({ ...classData, id: course.id }));
      setClassData((classData) => ({
        ...classData,
        startDate: course.start_date,
      }));
      setClassData((classData) => ({ ...classData, endDate: course.end_date }));
    }
  }, [course]);

  const close = () => {
    props.handleClose();
    setClassData('');
  };

  return (
    <div>
      <p>
        Click on a class to edit the information or click edit class again to
        end edit mode!
        {JSON.stringify(classData)}
      </p>
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
            <Grid container justify='space-around'>
              <TextField
                value={classData.className}
                onChange={(e) =>
                  setClassData({ ...classData, className: e.target.value })
                }
                label='Class Name'
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='Date picker inline'
                  value={classData.startDate}
                  onChange={(date) =>
                    setClassData({ ...classData, startDate: date })
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />

                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='Date picker inline'
                  value={classData.endDate}
                  onChange={(date) =>
                    setClassData({ ...classData, endDate: date })
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <TextField
                value={classData.inviteCoteacher}
                onChange={(e) =>
                  setClassData({
                    ...classData,
                    inviteCoteacher: e.target.value,
                  })
                }
                label='Invite Co-teacher'
              />
              <Button type='submit'>Submit</Button>
              <Button onClick={close}>Cancel</Button>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditModal;
