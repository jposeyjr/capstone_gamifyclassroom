import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addStudent(action) {
  try {
    yield axios.post('/api/student', action.payload);
    yield getStudents();
  } catch (error) {
    console.log('Error with adding Student data: ', error);
  }
}

function* editStudent(action) {
  try {
    yield axios.put('/api/student/id', action.payload);
    yield getStudents();
  } catch (error) {
    console.log('Error updating Student with new info: ', error);
  }
}

function* getStudents(action) {
  try {
    const id = action.payload;
    const results = yield axios.get(`/api/student/${id}`);
    yield put({ type: 'SET_STUDENT', payload: results.data });
  } catch (error) {
    console.log('Error with getting Student data:', error);
  }
}

function* removeStudent(action) {
  try {
    const id = action.payload;
    yield axios.delete(`/api/student/${id}`);
    yield getStudents();
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
