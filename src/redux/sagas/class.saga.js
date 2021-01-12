import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getClasses() {
  try {
    const results = yield axios.get('/api/class');
    yield put({ type: 'SET_CLASSES', payload: results.data });
  } catch (error) {
    console.log('Error with getting classroom data:', error);
  }
}

function* classSaga() {
  yield takeLatest('GET_CLASSES', getClasses);
}

export default classSaga;
