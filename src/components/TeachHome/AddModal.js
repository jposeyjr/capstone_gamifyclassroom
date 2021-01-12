import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

export default function SimpleModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState({
    className: '',
    startDate: '',
    endDate: '',
    inviteCoteacher: '',
  });

  const addClass = () => {
    console.log('added', classData);
    // dispatch({ type: 'ADD_CLASS', payload: classData });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClassData('');
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date('2019-12-02T11:11:11')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Add Class
      </Button>

      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Simple React Modal</h2>
          <form className={classes.root} noValidate autoComplete='off'>
            <Grid container justify='space-around'>
              <TextField
                value={classData.className}
                onChange={(e) => setClassData({ className: e.target.value })}
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
                  value={selectedDate}
                  onChange={handleDateChange}
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
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <TextField
                value={classData.inviteCoteacher}
                onChange={(e) =>
                  setClassData({ inviteCoteacher: e.target.value })
                }
                label='Invite Co-teacher'
              />
              <Button onClick={addClass}>Submit</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
}
