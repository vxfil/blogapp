import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

export const PostPreview = ({ preview, date, userId, _id }) => {
  const [profileInfo, setProfileInfo] = useState({});

  let { url } = useRouteMatch();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/profile/profile_info/${userId}`)
      .then((res) => {
        setProfileInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="box mt-5">
      <article className="media">
        <figure className="media-left">
          <p className="image is-96x96">
            {profileInfo.avatar ? (
              <img src={profileInfo.avatar} />
            ) : (
              <img src="https://bulma.io/images/placeholders/96x96.png" />
            )}
          </p>
          <span className="tag is-white">{profileInfo.username}</span>
        </figure>
        <div className="media-content">
          <div className="content">{ReactHtmlParser(preview)}</div>
          <nav className="level">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fas fa-heart"></i>
                  <p>5</p>
                </span>
              </a>
            </div>
            <div className="level-right">
              <a className="level-item">
                <span className="tag is-light is-medium">
                  <Link to={`${url}/${_id}`} style={{ color: 'black' }}>
                    Read more ...
                  </Link>
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
    </div>
  );
};
