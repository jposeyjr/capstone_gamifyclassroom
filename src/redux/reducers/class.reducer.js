const classReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLASSES':
      return action.payload;
    case 'ADD_CLASS':
      return [...state, action.payload];
    case 'EDIT_CLASS':
      return state.map((classroom) =>
        classroom.courses.id === action.payload.id ? action.payload : classroom
      );
    case 'UNSET_CLASS':
      return [];
    default:
      return state;
  }
};

export default classReducer;
