const courseReducer = (classroom = [], action) => {
  switch (action.type) {
    case 'SET_COURSE':
      return action.payload;
    case 'UNSET_CLASS':
      return [];
    default:
      return classroom;
  }
};
export default courseReducer;
