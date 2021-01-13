const classReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLASSES':
      return action.payload;
    case 'ADD_CLASS':
      return [...state, action.payload];
    case 'EDIT_CLASS':
      return state.map((course) =>
        course.id === action.payload.id ? action.payload : course
      );
    case 'DELETE_CLASS':
      return state.filter((course) => course.id !== action.payload);
    case 'UNSET_CLASS':
      return [];
    default:
      return state;
  }
};

export default classReducer;
