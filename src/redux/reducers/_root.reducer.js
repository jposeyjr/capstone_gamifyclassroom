import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import classroom from './class.reducer';
import course from './course.reducer';
import student from './student.reducer';
import point from './points.reducer';
import socketStudent from './socket.reducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  classroom,
  course,
  student,
  point,
  socketStudent,
});

export default rootReducer;
