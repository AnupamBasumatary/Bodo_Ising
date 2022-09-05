import React, { useEffect } from 'react';
import { useAuth, loadUser } from '../../../context/auth/AuthState';
import UserDetails from './UserDetails';

const LoadUser = () => {
  const [authState, authDispatch] = useAuth();
  const { user } = authState;

  useEffect(() => {
    loadUser(authDispatch);
  }, [authDispatch]);

  if (user) return <UserDetails />;
};

export default LoadUser;
