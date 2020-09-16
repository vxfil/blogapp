import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const SignUp = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm: '',
      username: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please fill the field'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Please fill the field'),
      confirm: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(20, 'Must be 20 characters or less')
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Please fill the field'),
      username: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .max(15, 'Must be 15 characters or less')
        .required('Please fill the field'),
    }),
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        isConfirmed: false,
        password: values.password,
        username: values.username,
      };
      return axios
        .post('http://localhost:4000/auth/signup', data)
        .then((res) => {
          localStorage.setItem('_id', res.data._id);
          history.push('/passconfirm');
        })
        .catch((err) => setError(err.response.data));
    },
  });

  const [passIsHide, setPassIsHide] = useState(true);
  const [error, setError] = useState('');

  return (
    <div
      className="hero has-background-info-light is-fullheight"
      style={{ justifyContent: 'center' }}
    >
      <div className="columns is-centered is-vcentered is-desktop">
        <div className="column is-one-quarter">
          {error ? (
            <div className="notification is-danger is-light">
              <button className="delete" onClick={() => setError('')}></button>
              {`${error}`}
            </div>
          ) : null}
          <div className="box">
            <form onSubmit={formik.handleSubmit}>
              <div className="field">
                <h4 className="title is-4">Sign up</h4>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    placeholder="Email"
                    className="input"
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <span className="icon is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  {formik.touched.email && formik.errors.email ? (
                    <p className="help is-danger">{formik.errors.email}</p>
                  ) : null}
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input
                    placeholder="Password"
                    className="input"
                    id="password"
                    name="password"
                    type={passIsHide ? 'password' : 'text'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <span className="icon is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                  <span
                    className="icon is-right"
                    onClick={() => setPassIsHide(!passIsHide)}
                    style={{ pointerEvents: 'initial' }}
                  >
                    <i
                      className={passIsHide ? 'fas fa-eye' : 'fas fa-eye-slash'}
                    ></i>
                  </span>
                  {formik.touched.password && formik.errors.password ? (
                    <p className="help is-danger">{formik.errors.password}</p>
                  ) : null}
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input
                    placeholder="Confirm password"
                    className="input"
                    id="confirm"
                    name="confirm"
                    type={passIsHide ? 'password' : 'text'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm}
                  />
                  <span className="icon is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                  <span
                    className="icon is-right"
                    onClick={() => setPassIsHide(!passIsHide)}
                    style={{ pointerEvents: 'initial' }}
                  >
                    <i
                      className={passIsHide ? 'fas fa-eye' : 'fas fa-eye-slash'}
                    ></i>
                  </span>
                  {formik.touched.confirm && formik.errors.confirm ? (
                    <p className="help is-danger">{formik.errors.confirm}</p>
                  ) : null}
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    placeholder="Username"
                    className="input"
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  <span className="icon is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  {formik.touched.username && formik.errors.username ? (
                    <p className="help is-danger">{formik.errors.username}</p>
                  ) : null}
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Create account
                  </button>
                </div>
                <div className="control">
                  <Link to="/">
                    <button className="button is-link">Sign in</button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
