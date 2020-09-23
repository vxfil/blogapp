export const replyIsCreatedAction = (replyId) => {
  return {
    type: 'REPLY_IS_CREATED',
    payload: replyId,
  };
};
