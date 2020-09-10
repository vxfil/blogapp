import React, { useState } from 'react';

export const Toolbar = () => {
  const [selectedText] = useState(document.getSelection());
  console.log(selectedText);

  const format = (command, value) => {
    document.execCommand(command, false, value);
  };

  const setHeader = () => {
    return format('insertHTML', `<h2 class="title">${selectedText}</h2>`);
  };

  const setBold = () => {
    return format(
      'insertHTML',
      `<b class="has-text-weight-bold">${selectedText}</b>`
    );
  };

  const setItalic = () => {
    return format('insertHTML', `<i class="is-italic">${selectedText}</i>`);
  };

  const setBlockQuote = () => {
    return format(
      'insertHTML',
      `<article class="message is-dark">
      <div class="message-body">
        ${selectedText}
      </div>
    </article>`
    );
  };

  return (
    <div className="field has-addons">
      <p className="control">
        <button className="button" onClick={() => setHeader()}>
          <span className="icon is-small">
            <i className="fas fa-heading"></i>
          </span>
        </button>
      </p>
      <p className="control">
        <button className="button" onClick={() => setBold()}>
          <span className="icon is-small">
            <i className="fas fa-bold"></i>
          </span>
        </button>
      </p>
      <p className="control">
        <button className="button" onClick={() => setItalic()}>
          <span className="icon is-small">
            <i className="fas fa-italic"></i>
          </span>
        </button>
      </p>
      <p className="control">
        <button className="button" onClick={() => setBlockQuote()}>
          <span className="icon is-small">
            <i className="fas fa-quote-right"></i>
          </span>
        </button>
      </p>
      <p className="control">
        <button className="button">
          <span className="icon is-small">
            <i className="fas fa-underline"></i>
          </span>
        </button>
      </p>
      <p className="control">
        <button className="button">
          <span className="icon is-small">
            <i className="far fa-image"></i>
          </span>
        </button>
      </p>
      <p className="control">
        <button className="button">
          <span className="icon is-small">
            <i className="fab fa-youtube"></i>
          </span>
        </button>
      </p>
      <div class="file">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
          </span>
        </label>
      </div>
    </div>
  );
};
