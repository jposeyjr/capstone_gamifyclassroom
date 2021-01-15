const studentReducer = (students = [], action) => {
  switch (action.type) {
    case 'SET_STUDENT':
      return action.payload;
    case 'ADD_STUDENT':
      return [...students, action.payload];
    case 'EDIT_STUDENT':
      //goes through the total list of courses and only changes the one that matches
      return students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
    case 'DELETE_STUDENT':
      //goes through and keeps everyone but the one that matches
      return students.filter((student) => student.id !== action.payload);
    case 'UNSET_STUDENT':
      return [];
    default:
      return students;
  }
};

export default studentReducer;
