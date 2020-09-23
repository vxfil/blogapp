import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { CommentsBlock } from './CommentsBlock';

export const CommentCreator = ({ postId }) => {
  const [userInfo, setUserInfo] = useState({});
  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState('');

  useEffect(() => {
    const _id = localStorage.getItem('_id');
    axios
      .get(`http://localhost:4000/profile/profile_info/${_id}`)
      .then((res) => {
        setUserInfo({
          avatar: res.data.avatar,
          username: res.data.username,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const writeCommentHandler = () => {
    axios
      .post('http://localhost:4000/main/write_comment', {
        userId: localStorage.getItem('_id'),
        postId: postId,
        content: comment,
      })
      .then((res) => {
        setCommentId(res.data._id);
        setComment('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <CommentsBlock postId={postId} commentId={commentId} />

      <article className="media">
        <figure className="media-left">
          <div className="image is-64x64">
            {userInfo.avatar ? (
              <img src={userInfo.avatar} />
            ) : (
              <img src="https://bulma.io/images/placeholders/64x64.png" />
            )}
          </div>
          <span className="tag is-white">{userInfo.username}</span>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                style={{ minHeight: '4.5em' }}
                className="textarea has-fixed-size"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                className="button is-info is-small"
                onClick={() => writeCommentHandler()}
                disabled={comment.length < 2}
              >
                Post comment
              </button>
            </p>
          </div>
        </div>
      </article>
    </>
  );
};
