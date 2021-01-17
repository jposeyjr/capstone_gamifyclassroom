const pointReducer = (pointStudent = {}, action) => {
  switch (action.type) {
    case 'SET_POINT_STUDENT':
      return action.payload;
    default:
      return pointStudent;
  }
};

export default pointReducer;
