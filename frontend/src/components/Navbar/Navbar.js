import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

import api from '../../api';

const logo = require('../Navbar/logo-blog.svg');

const Navbar = ({ history }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [isAuth, setIsAuth] = useState(localStorage.getItem('accessToken'));
  useEffect(() => setIsAuth(localStorage.getItem('accessToken')));

  const logoutHandler = async () => {
    let refreshToken = localStorage.getItem('refreshToken');
    return api
      .logout({ refreshToken })
      .then((res) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('_id');
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="http://localhost:3000">
          <img src={logo} width="112" height="28" />
        </a>
        {isAuth ? (
          <a
            role="button"
            className={`navbar-burger burger ${
              !menuIsOpen ? null : 'is-active'
            }`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        ) : null}
      </div>
      {isAuth ? (
        <div className={`navbar-menu ${!menuIsOpen ? null : 'is-active'}`}>
          <div className="navbar-start">
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/posts"
              exact
            >
              Posts
            </NavLink>
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/createpost"
            >
              Create post
            </NavLink>
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/about"
            >
              About
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <button className="button is-primary" onClick={logoutHandler}>
                Log out
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default withRouter(Navbar);
