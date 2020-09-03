import React from 'react';

export const Post = ({ title, content }) => {
  return (
    <div className="message">
      <header className="message-header">
        <p>{title}</p>
      </header>
      <div className="message-body">
        <div className="content">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};
