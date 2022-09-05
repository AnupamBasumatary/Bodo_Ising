import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';

const UserPrivateRoute = ({ component: Component }) => {
  const [authState] = useAuth();
  const { isAuthenticated } = authState;
  if (isAuthenticated) return <Component />;
  return <Navigate to='/Login' />;
};

export default UserPrivateRoute;
