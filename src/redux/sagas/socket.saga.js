import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSocketStudent(action) {
  const id = action.payload;
  try {
    const results = yield axios.get(`/api/student/solo/${id}`);
    yield put({ type: 'SET_SOCKET_STUDENT', payload: results.data });
  } catch (error) {
    console.log('Error with getting socket Student data:', error);
  }
}

function* socketSaga() {
  yield takeLatest('GET_SOCKET_STUDENT', getSocketStudent);
}

export default socketSaga;