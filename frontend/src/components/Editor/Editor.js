import React from 'react';
import { Toolbar } from '../Toolbar/Toolbar';

export const Editor = () => {
  const paste = (e) => {};

  return (
    <>
      <Toolbar />
      <div
        style={{ backgroundColor: 'violet' }}
        className="title"
        id="title"
        contentEditable="true"
        data-placeholder="Title..."
      ></div>

      <div
        style={{ backgroundColor: 'wheat' }}
        className="editor"
        id="editor"
        contentEditable="true"
        data-placeholder="Body..."
        onPaste={(e) => paste(e)}
      ></div>
    </>
  );
};
