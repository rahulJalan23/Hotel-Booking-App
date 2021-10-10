import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

function PrivateRoute(props) {
  const { auth } = useSelector((state) => {
    console.log(state.auth);
    return state;
  });
  return auth && auth.activeToken ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
}

export default PrivateRoute;
