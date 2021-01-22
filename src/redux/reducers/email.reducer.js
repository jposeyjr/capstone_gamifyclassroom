const emailReducer = (emailStudent = [], action) => {
  switch (action.type) {
    case 'SET_EMAIL_STUDENT':
      return action.payload;
    default:
      return emailStudent;
  }
};

export default emailReducer;
