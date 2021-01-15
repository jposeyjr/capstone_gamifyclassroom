const socketReducer = (points = {}, action) => {
  switch (action.type) {
    case 'SET_POINT':
      return action.payload;
    default:
      return points;
  }
};

export default socketReducer;
