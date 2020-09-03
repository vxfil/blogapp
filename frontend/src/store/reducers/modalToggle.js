const initialState = {
  isOpen: false,
};

export const modalToggle = (state = initialState, action) => {
  switch (action.type) {
    case 'MODAL_TOGGLE':
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};
