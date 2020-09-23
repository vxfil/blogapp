import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { ReplyCreator } from './ReplyCreator';
import { Reply } from './Reply';

export const Comment = ({
  avatar,
  username,
  content,
  date,
  commentId,
  replys,
}) => {
  const [replyIsHidden, setIsHidden] = useState(true);

  return (
    <article className="media">
      <figure className="media-left">
        <div className="image is-64x64">
          {avatar ? (
            <img src={avatar} />
          ) : (
            <img src="https://bulma.io/images/placeholders/64x64.png" />
          )}
        </div>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{username}</strong>
            <br />
            {content}
            <br />
            <small>
              <a onClick={() => setIsHidden((prevState) => !prevState)}>
                <span className="tag is-link is-light">Reply</span>
              </a>{' '}
              ·{' '}
              <span className="tag is-info is-light">
                {moment(date).fromNow()}
              </span>
            </small>
          </p>
        </div>
        {replys.map((reply, index) => {
          return (
            <Reply
              key={index}
              avatar={reply.avatar}
              username={reply.username}
              content={reply.content}
              date={reply.createdAt}
            />
          );
        })}
        <ReplyCreator
          isHidden={replyIsHidden}
          avatar={avatar}
          username={username}
          commentId={commentId}
        />
      </div>
    </article>
  );
};
