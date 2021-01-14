const pointReducer = (students = {}, action) => {
  switch (action.type) {
    case 'SET_SELECT_STUDENT':
      return action.payload;
    case 'DELETE_STUDENT':
      return students.filter((student) => student.id !== action.payload);
    case 'UNSET_STUDENT':
      return {};
    default:
      return students;
  }
};

export default pointReducer;
