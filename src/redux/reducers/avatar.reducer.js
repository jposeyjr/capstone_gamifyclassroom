const avatarReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_AWS_AVATAR':
      return action.payload;
    default:
      return state;
  }
};

export default avatarReducer;
