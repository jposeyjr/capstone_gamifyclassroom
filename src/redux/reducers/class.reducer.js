const classReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLASSES':
      return action.payload;
    case 'UNSET_CLASS':
      return [];
    default:
      return state;
  }
};

export default classReducer;
