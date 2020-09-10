import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import Link from '@ckeditor/ckeditor5-link/src/link';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';

export const CreatePost = () => {
  return (
    <div className="hero is-light is-fullheight-with-navbar">
      <div className="section">
        <CKEditor
          editor={ClassicEditor}
          config={{
            plugins: [
              Heading,
              Essentials,
              Bold,
              Italic,
              Paragraph,
              BlockQuote,
              CodeBlock,
              HorizontalLine,
              Link,
              SimpleUploadAdapter,
              MediaEmbed,
              Image,
              ImageToolbar,
              ImageCaption,
              ImageStyle,
              ImageResize,
              LinkImage,
              ImageUpload,
            ],
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'blockQuote',
              'codeBlock',
              'horizontalLine',
              'link',
              '|',
              'imageUpload',
              'imageStyle:full',
              'imageStyle:side',
              'imageTextAlternative',
              '|',
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
            simpleUpload: {
              uploadUrl: 'http://localhost:4000/main/upload_image',
              //withCredentials: true,
              headers: {
                'x-auth-token': `${localStorage.getItem('accessToken')}`,
              },
            },
          }}
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
        />
      </div>
    </div>
  );
};
