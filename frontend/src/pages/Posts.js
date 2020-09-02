import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../store/actions/postsActions';

import { Post } from '../components/Post';

export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  return (
    <div className="container">
      <h1>Posts page</h1>
      <button
        className="button is-success"
        onClick={() => dispatch(loadPosts())}
      >
        Download posts
      </button>
      {posts.map((post, index) => {
        return <Post title={post.title} content={post.content} key={index} />;
      })}
    </div>
  );
};
