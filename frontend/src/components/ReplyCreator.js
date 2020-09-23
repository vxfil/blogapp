import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { replyIsCreatedAction } from '../store/actions/replyIsCreatedAction';

export const ReplyCreator = ({ isHidden, commentId }) => {
  const [userInfo, setUserInfo] = useState({});
  const [reply, setReply] = useState('');

  const dispatch = useDispatch();

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

  const replyToCommentHandler = () => {
    axios
      .patch('http://localhost:4000/main/update_comment', {
        userId: localStorage.getItem('_id'),
        commentId: commentId,
        content: reply,
        avatar: userInfo.avatar,
        username: userInfo.username,
      })
      .then((res) => {
        setReply('');
        return dispatch(replyIsCreatedAction(res.data._id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <article className={`media ${isHidden ? 'is-hidden' : ''}`}>
        <figure className="media-left">
          <div className="image is-48x48">
            {userInfo.avatar ? (
              <img src={userInfo.avatar} />
            ) : (
              <img src="https://bulma.io/images/placeholders/48x48.png" />
            )}
          </div>
          <span className="tag is-white">{userInfo.username}</span>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                style={{ minHeight: '4em' }}
                className="textarea has-fixed-size"
                placeholder="Add a comment..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                className="button is-info is-small"
                onClick={() => replyToCommentHandler()}
                disabled={reply.length < 2}
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
