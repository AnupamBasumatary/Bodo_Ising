import React from 'react';
import { useAuth } from '../../../context/auth/AuthState';
import { Navigate } from 'react-router-dom';

const NavigateUser = () => {
  const [authState, authDispatch] = useAuth();
  const { user } = authState;
  if (user.firstName) {
    return <Navigate to='/UpdateUser' />;
  } else {
    return <Navigate to='/UserDetails' />;
  }
};

export default NavigateUser;
