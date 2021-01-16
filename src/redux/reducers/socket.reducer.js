const socketReducer = (socketStudent = {}, action) => {
  switch (action.type) {
    case 'SET_SOCKET_STUDENT':
      return action.payload;
    default:
      return socketStudent;
  }
};

export default socketReducer;
