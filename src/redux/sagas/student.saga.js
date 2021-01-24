import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Adds a student to the DB by receiving a payload object to send to the server
 * @param {Object} action Action payload that holds the students name, email, password, start_date, avatar, course and teacher id
 * */

function* addStudent(action) {
  try {
    yield axios.post('/api/student', action.payload);
    yield getStudents();
  } catch (error) {
    console.log('Error with adding Student data: ', error);
  }
}
/**
 * Edits a student info in the DB by receiving a payload object to send to the server
 * @param {Object} action Action payload that holds the students name, email, password, start_date, avatar, course and teacher id
 * */

function* editStudent(action) {
  try {
    yield axios.put('/api/student/id', action.payload);
  } catch (error) {
    console.log('Error updating Student with new info: ', error);
  }
}

/**
 * Gets all student belonging to the id in the DB
 * @param {Number} action Action payload that holds the course.id
 * */

function* getStudents(action) {
  try {
    const id = action.payload;
    const results = yield axios.get(`/api/student/${id}`);
    yield put({ type: 'SET_STUDENT', payload: results.data });
  } catch (error) {
    console.log('Error with getting Student data:', error);
  }
}

/**
 * Removes a student from the DB by receiving a payload id to send to the server
 * @param {Number} action Action payload that holds the students id number
 * */

function* removeStudent(action) {
  try {
    const id = action.payload;
    yield axios.delete(`/api/student/${id}`);
  } catch (error) {
    console.log('Error with remove Student data: ', error);
  }
}

function* studentSaga() {
  yield takeLatest('GET_STUDENTS', getStudents);
  yield takeLatest('ADD_STUDENT', addStudent);
  yield takeLatest('EDIT_STUDENT', editStudent);
  yield takeLatest('DELETE_STUDENT', removeStudent);
}

export default studentSaga;
