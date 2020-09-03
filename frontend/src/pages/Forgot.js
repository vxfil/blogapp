import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

export const Forgot = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please fill the field'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="hero is-fullheight" style={{ justifyContent: 'center' }}>
      <div className="columns is-desktop is-centered is-vcentered">
        <div className="column is-one-quarter">
          <div className="box">
            <form onSubmit={formik.handleSubmit}>
              <div className="field">
                <h4 className="title is-4">Forgot password?</h4>
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
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Confirm
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
