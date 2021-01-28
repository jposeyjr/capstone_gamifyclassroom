import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Will be fired on "REGISTER" action
 * @param {Object} action Action payload that holds the name, email, and password for a new user
 * It will then log them in after if no errors, then sets it to redux state to allow the component to show
 * */
function* registerUser(action) {
  try {
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
