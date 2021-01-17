const selectStudentReducer = (students = {}, action) => {
  switch (action.type) {
    case 'SET_SELECT_STUDENT':
      return action.payload;
    case 'UNSET_STUDENT':
      return {};
    default:
      return students;
  }
};

export default selectStudentReducer;
