import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';

export const Post = () => {
  const [content, setContent] = useState('');
  const { postId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/main/get_post/${postId}`)
      .then((res) => setContent(res.data.content))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="hero has-background-info-light is-fullheight-with-navbar">
      <div className="container">
        <div className="box">{ReactHtmlParser(content)}</div>
      </div>
    </div>
  );
};
