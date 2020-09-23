import React, { useEffect } from 'react';
import moment from 'moment';

export const Reply = ({ avatar, username, content, date }) => {
  return (
    <article className="media">
      <figure className="media-left">
        <div className="image is-48x48">
          {avatar ? (
            <img src={avatar} />
          ) : (
            <img src="https://bulma.io/images/placeholders/48x48.png" />
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
            <span className="tag is-info is-light">
              {moment(date).fromNow()}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
};
