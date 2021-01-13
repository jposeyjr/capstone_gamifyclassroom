const courseReducer = (classroom = [], action) => {
  switch (action.type) {
    case 'SET_COURSE':
      return action.payload;
    case 'DELETE_CLASS':
      return classroom.filter((course) => course.id !== action.payload);
    case 'UNSET_CLASS':
      return [];
    default:
      return classroom;
  }
};
export default courseReducer;
