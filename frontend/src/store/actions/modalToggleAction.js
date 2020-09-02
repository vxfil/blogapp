export const modalToggleAction = (isOpen) => {
  return {
    type: 'MODAL_TOGGLE',
    payload: isOpen,
  };
};
