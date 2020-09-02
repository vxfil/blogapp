import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import moment from 'moment';

import { Countdown } from '../components/Countdown';

export const PassConfirm = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(6, 'Must be exactly 6 digits')
        .max(6, 'Must be exactly 6 digits'),
    }),
    onSubmit: async ({ code }) => {
      return axios
        .post('http://localhost:4000/auth/passconfirm', {
          code,
          userId: localStorage.getItem('_id'),
        })
        .then((response) =>
          response.data.error
            ? setMessage(`${response.data.error}`)
            : history.push('/')
        )
        .catch((err) => console.log(err));
    },
  });

  const [message, setMessage] = useState(
    'For the final registration you need to confirm your email, the code has already been sent to your mailbox and will be valid for 15 minutes'
  );
  const [resendIsClicked, setIsClicked] = useState(false);

  const resendHandler = async () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 120000);
    return axios
      .post('http://localhost:4000/auth/resend', {
        _id: localStorage.getItem('userId'),
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="hero is-fullheight" style={{ justifyContent: 'center' }}>
      <div className="columns is-desktop is-centered is-vcentered">
        <div className="column is-one-quarter">
          {message ? (
            <div className="notification is-primary is-light">
              <button
                className="delete"
                onClick={() => setMessage('')}
              ></button>
              {`${message}`}
            </div>
          ) : null}
          <div className="box">
            <form onSubmit={formik.handleSubmit}>
              <div className="field">
                <h4 className="title is-4">Confirmation of registration</h4>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    placeholder="Code"
                    className="input"
                    id="code"
                    name="code"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.code}
                  />
                  <span className="icon is-left">
                    <i className="far fa-check-circle"></i>
                  </span>
                  {formik.touched.code && formik.errors.code ? (
                    <p className="help is-danger">{formik.errors.code}</p>
                  ) : null}
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Confirm
                  </button>
                </div>
                <div className="control">
                  <button
                    className="button is-link"
                    onClick={resendHandler}
                    disabled={resendIsClicked ? true : false}
                  >
                    Resend code
                  </button>
                </div>
                {resendIsClicked ? (
                  <div className="control">
                    <Countdown
                      timeTillDate={moment().add(2, 'm')}
                      timeFormat="mm:ss"
                    />
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
