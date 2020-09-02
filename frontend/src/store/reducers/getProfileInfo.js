const initialState = {
  profile: {},
};

export const getProfileInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
