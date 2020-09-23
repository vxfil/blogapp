import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Comment } from './Comment';

export const CommentsBlock = ({ postId, commentId }) => {
  const [comments, setComments] = useState([]);

  const replyId = useSelector((state) => state.replyIsCreatedReducer.replyId);

  const fetchComments = () => {
    axios
      .get(`http://localhost:4000/main/get_comments/${postId}`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchComments();
  }, [commentId, replyId]);

  return (
    <>
      {comments.map((comment, index) => {
        return (
          <Comment
            key={index}
            avatar={comment.avatar}
            username={comment.username}
            content={comment.content}
            date={comment.createdAt}
            commentId={comment._id}
            replys={comment.replys}
          />
        );
      })}
    </>
  );
};
