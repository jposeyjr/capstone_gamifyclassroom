const studentReducer = (students = [], action) => {
  switch (action.type) {
    case 'SET_STUDENTS':
      return action.payload;
    case 'ADD_STUDENT':
      return [...students, action.payload];
    case 'EDIT_STUDENT':
      return students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
    case 'DELETE_STUDENT':
      return students.filter((student) => student.id !== action.payload);
    case 'UNSET_STUDENT':
      return [];
    default:
      return students;
  }
};

export default studentReducer;
