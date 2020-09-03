import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { modalToggleAction } from '../store/actions/modalToggleAction';

export const ModalProfile = ({ active }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      additionalInfo: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .max(30, 'Must be 30 characters or less'),
      lastName: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .max(30, 'Must be 30 characters or less'),
      additionalInfo: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .max(200, 'Must be 200 characters or less'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      return axios
        .post('http://localhost:4000/profile/update_profile', {
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            additionalInfo: values.additionalInfo,
          },
          _id: localStorage.getItem('_id'),
        })
        .then((res) => {
          console.log(res);
          dispatch(modalToggleAction(false));
          window.location.reload();
        })
        .catch((err) => console.log(err));
    },
  });

  const profileSettings = useSelector((state) => state.getProfileInfo.profile);

  const [avatar, setAvatar] = useState('');
  const [onLoad, setOnload] = useState(false);
  const [preLoad, setPreLoad] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (profileSettings.avatar) {
      setAvatar(profileSettings.avatar);
    }
    return;
  });

  const chooseFileHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => setPreLoad(reader.result);
    }
    console.log('Please choose image file');
    return;
  };

  const upload = async (image) => {
    setOnload(true);
    const _id = localStorage.getItem('_id');
    return axios
      .post('http://localhost:4000/profile/upload_avatar', { image, _id })
      .then((res) => {
        console.log(res.data);
        setAvatar(res.data);
        setOnload(false);
      })
      .catch((err) => {
        console.log(err);
        setOnload(false);
      });
  };

  return (
    <div className={`modal ${active ? 'is-active' : null}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Profile settings</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => dispatch(modalToggleAction(false))}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="columns">
            <div className="column is-one-third">
              {profileSettings.firstName && profileSettings.lastName ? (
                <p className="title is-5">{`${profileSettings.firstName} ${profileSettings.lastName}`}</p>
              ) : null}
              <p className="subtitle is-6" style={{ marginBottom: '0.5rem' }}>
                {profileSettings.username}
              </p>
              <figure className="image is-128x128 mb-2">
                <img
                  style={{ height: '128px', width: '128px' }}
                  src={
                    // profileSettings.avatar
                    //   ? profileSettings.avatar
                    //   : 'https://bulma.io/images/placeholders/128x128.png'
                    avatar
                      ? avatar
                      : 'https://bulma.io/images/placeholders/128x128.png'
                  }
                  alt="Placeholder image"
                />
              </figure>
              <div className="field is-grouped">
                <div className="file is-small">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="avatar"
                      onChange={chooseFileHandler}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Upload avatar</span>
                    </span>
                  </label>
                </div>
                <button
                  className={
                    onLoad ? 'button is-small is-loading' : 'button is-small'
                  }
                  onClick={() => upload(preLoad)}
                >
                  Upload
                </button>
              </div>
            </div>
            <div className="column">
              {/* FORM!!! */}
              <form onSubmit={formik.handleSubmit} id="modalForm">
                <div className="field">
                  <strong>Edit profile</strong>
                </div>
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      placeholder="First name"
                      className="input"
                      id="firstName"
                      name="firstName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    <span className="icon is-left">
                      <i className="fas fa-user"></i>
                    </span>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <p className="help is-danger">
                        {formik.errors.firstName}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      placeholder="Last name"
                      className="input"
                      id="lastName"
                      name="lastName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    <span className="icon is-left">
                      <i className="far fa-user"></i>
                    </span>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <p className="help is-danger">{formik.errors.lastName}</p>
                    ) : null}
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <textarea
                      placeholder="Additional information"
                      className="textarea has-fixed-size"
                      id="additionalInfo"
                      name="additionalInfo"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.additionalInfo}
                    />
                    {formik.touched.additionalInfo &&
                    formik.errors.additionalInfo ? (
                      <p className="help is-danger">
                        {formik.errors.additionalInfo}
                      </p>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" type="submit" form="modalForm">
            Save changes
          </button>
          <button
            className="button"
            onClick={() => dispatch(modalToggleAction(false))}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
