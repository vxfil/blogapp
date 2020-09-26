import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import moment from 'moment';

import { CommentCreator } from './CommentCreator';

export const Post = () => {
  const [content, setContent] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [date, setDate] = useState('');
  const [likes, setLikes] = useState([]);
  const [numOfLikes, setNumOfLikes] = useState(null);
  const [likeResult, setLikeResult] = useState('');

  const { postId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/main/get_post/${postId}`)
      .then((res) => {
        setContent(res.data.content);
        setUserInfo({
          avatar: res.data.avatar,
          username: res.data.username,
        });
        setDate(res.data.date);
        setLikes(res.data.likes);
        setNumOfLikes(res.data.likes.length);
      })
      .catch((err) => console.log(err));
  }, [likeResult]);

  const likesHandler = () => {
    const userId = localStorage.getItem('_id');
    if (likes.includes(userId)) {
      return axios
        .patch('http://localhost:4000/main/likes_handler', {
          userId,
          postId,
          actionType: 'decrement',
        })
        .then((res) => setLikeResult(res.data))
        .catch((err) => console.log(err));
    } else {
      return axios
        .patch('http://localhost:4000/main/likes_handler', {
          userId,
          postId,
          actionType: 'increment',
        })
        .then((res) => setLikeResult(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="hero has-background-info-light is-fullheight-with-navbar">
      <div className="box mt-5 ml-5 mr-5">
        <article className="media">
          <figure className="media-left">
            <div className="image is-96x96">
              {userInfo.avatar ? (
                <img src={userInfo.avatar} />
              ) : (
                <img src="https://bulma.io/images/placeholders/96x96.png" />
              )}
            </div>
            <span className="tag is-white">{userInfo.username}</span>
          </figure>
          <div className="media-content">
            <div className="content">{ReactHtmlParser(content)}</div>
            <nav className="level">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-small">
                    <i
                      className="fas fa-heart"
                      onClick={() => likesHandler()}
                    ></i>
                    <p>{numOfLikes < 1 ? null : numOfLikes}</p>
                  </span>
                </a>
              </div>
            </nav>
          </div>
          <div className="media-right">
            <span className="tag is-info is-light">
              {moment(date).format('DD.MM.YYYY')}
            </span>
          </div>
        </article>
        <CommentCreator postId={postId} />
      </div>
    </div>
  );
};
