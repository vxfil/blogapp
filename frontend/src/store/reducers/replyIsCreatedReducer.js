const initialState = {
  replyId: '',
};

export const replyIsCreatedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REPLY_IS_CREATED':
      return { ...state, replyId: action.payload };
    default:
      return state;
  }
};
