import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import api from '../../api';

export const SignIn = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please fill the field'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Please fill the field'),
    }),
    onSubmit: async (values) => {
      api
        .signin({ email: values.email, password: values.password })
        .then((res) => {
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          localStorage.setItem('_id', res.data._id);
          history.push('/posts');
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
      <div className="columns is-desktop is-centered is-vcentered">
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
                <h4 className="title is-4">Sign in</h4>
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
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Login
                  </button>
                </div>
                <div className="control">
                  <Link to="/signup">
                    <button className="button is-link">Registry</button>
                  </Link>
                </div>
              </div>
              <div className="field">
                <p className="has-text-black">
                  Forgot your <Link to="/forgot">password?</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
