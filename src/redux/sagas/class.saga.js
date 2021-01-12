import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addClass(action) {
  try {
    yield axios.post('/api/class', action.payload);
    yield getClasses();
  } catch (error) {
    console.log('Error with adding classroom data: ', error);
  }
}

function* editClass(action) {
  try {
    yield axios.put('/api/class', action.payload);
    yield getClasses();
  } catch (error) {
    console.log('Error with updating classroom data: ', error);
  }
}

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
  yield takeLatest('ADD_CLASS', addClass);
  yield takeLatest('EDIT_CLASS', editClass);
}

export default classSaga;
