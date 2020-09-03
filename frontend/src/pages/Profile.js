import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileInfo } from '../components/ProfileInfo/ProfileInfo';
import { getProfileInfoAction } from '../store/actions/getProfileInfoAction';

export const Profile = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    const id = localStorage.getItem('_id');
    return dispatch(getProfileInfoAction(id));
  };
  useEffect(() => {
    fetchData();
  });

  return (
    <div className="hero is-light is-fullheight-with-navbar ">
      <div className="section">
        <div className="columns">
          <div className="column is-one-third">
            <ProfileInfo />
          </div>

          <div className="column">
            <div className="box">
              <p>Posts</p>
              <div className="message is-info is-small">
                <header className="message-header">
                  <p>Title 1</p>
                </header>
                <div className="message-body">
                  <div className="content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                      <br />
                      {moment().format('DD.MM.YYYY | hh:mm')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
