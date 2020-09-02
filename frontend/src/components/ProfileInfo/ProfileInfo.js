import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalProfile } from '../ModalProfile';
import { modalToggleAction } from '../../store/actions/modalToggleAction';

export const ProfileInfo = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.modalToggle.isOpen);
  const profileSettings = useSelector((state) => state.getProfileInfo.profile);

  return (
    <>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-128x128 mb-2">
                <img
                  src={
                    profileSettings.avatar
                      ? profileSettings.avatar
                      : 'https://bulma.io/images/placeholders/128x128.png'
                  }
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-5">
                {profileSettings.firstName && profileSettings.lastName ? (
                  <p className="title is-5">{`${profileSettings.firstName} ${profileSettings.lastName}`}</p>
                ) : (
                  'Your name may be here'
                )}
              </p>
              <p className="subtitle is-6">{profileSettings.username}</p>
            </div>
            <div className="media-right">
              <button
                className="button is-small is-white"
                onClick={() => dispatch(modalToggleAction(true))}
              >
                <span className="icon is-small">
                  <i className="fas fa-user-edit"></i>
                </span>
              </button>
            </div>
          </div>

          <div className="content">
            {profileSettings.additionalInfo
              ? profileSettings.additionalInfo
              : 'Here you can write something about yourself'}
          </div>
        </div>
      </div>
      <ModalProfile active={isOpenModal} />
    </>
  );
};
