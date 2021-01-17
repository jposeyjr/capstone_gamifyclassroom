import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSelectStudent(action) {
  const id = action.payload;
  try {
    const results = yield axios.get(`/api/student/solo/${id}`);
    yield put({ type: 'SET_SELECT_STUDENT', payload: results.data });
  } catch (error) {
    console.log('Error with getting Student data:', error);
  }
}

function* selectStudentSaga() {
  yield takeLatest('GET_SELECT_STUDENT', getSelectStudent);
}

export default selectStudentSaga;
