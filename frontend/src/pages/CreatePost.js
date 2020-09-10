import React, { useState } from 'react';

export const CreatePost = () => {
  return (
    <div className="hero is-light is-fullheight-with-navbar">
      <div className="section">
        {/* <CKEditor
          config={{
            simpleUpload: {
              uploadUrl: 'http://localhost:4000/main/upload_image',
              withCredentials: true,
              headers: {
                'x-auth-token': `${localStorage.getItem('accessToken')}`,
              },
            },
            toolbar: [
              'heading',
              'bold',
              'italic',
              'link',
              'blockQuote',
              '|',
              'imageUpload',
              'mediaEmbed',
            ],
            heading: {
              options: [
                {
                  model: 'heading1',
                  view: {
                    name: 'h1',
                    classes: 'title',
                  },
                  title: 'Heading 1',
                  class: 'title',
                },
                {
                  model: 'heading2',
                  view: {
                    name: 'h2',
                    classes: 'subtitle',
                  },
                  title: 'Heading 2',
                  class: 'subtitle',
                },
                { model: 'paragraph', title: 'Paragraph', class: 'p' },
              ],
            },
          }}
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onInit={(editor) => console.log('Editor is ready!', editor)}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus', editor);
          }}
        /> */}

        {/* <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onInit={(editor) => console.log('Editor is ready!', editor)}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus', editor);
          }}
        /> */}
      </div>
    </div>
  );
};
