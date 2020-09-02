import axios from 'axios';

export const loadPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:4000/main/posts');
      dispatch({ type: 'LOAD_POSTS', payload: response.data.posts });
    } catch (err) {
      console.log(err.response);
      alert(err.response.data);
    }
  };
};
