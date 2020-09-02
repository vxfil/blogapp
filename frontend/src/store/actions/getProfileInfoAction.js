import axios from 'axios';

export const getProfileInfoAction = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/profile/profile_info/${id}`
      );
      dispatch({ type: 'GET_PROFILE', payload: response.data });
    } catch (err) {
      console.log(err.response);
    }
  };
};
