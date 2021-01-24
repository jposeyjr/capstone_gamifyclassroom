import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateStudent(action) {
  try {
    yield axios.put(`/api/student/avatar`, action.payload);
  } catch (error) {
    console.log('Error with sending avatar to db:', error);
  }
}

function* updateSaga() {
  yield takeLatest('UPDATE_AVATAR', updateStudent);
}

export default updateSaga;
