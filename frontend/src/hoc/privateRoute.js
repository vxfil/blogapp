import React from 'react';
import { Redirect } from 'react-router-dom';

const privateRoute = (Component) => {
  const AuthRoute = () => {
    const isAuth = localStorage.getItem('accessToken');
    if (isAuth) {
      return <Component />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return AuthRoute;
};

export default privateRoute;
