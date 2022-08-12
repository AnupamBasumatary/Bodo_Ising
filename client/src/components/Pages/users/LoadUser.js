import React, { useEffect } from 'react';
import { useAuth, loadUser, setCurrent } from '../../../context/auth/AuthState';
import NavigateUser from './NavigateUser';
import UserDetails from './UserDetails';

const LoadUser = () => {
  const [authState, authDispatch] = useAuth();
  const { user } = authState;

  useEffect(() => {
    loadUser(authDispatch);
  }, [authDispatch]);

  // if (user) return <NavigateUser />;
  if (user) return <UserDetails />;
};

export default LoadUser;
