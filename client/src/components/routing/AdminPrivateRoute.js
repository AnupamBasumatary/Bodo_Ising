import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ component: Component }) => {
  const adminToken = localStorage.getItem('admintoken');

  if (adminToken) {
    return <Component />;
  } else {
    return <Navigate to='*' />;
  }
};

export default AdminPrivateRoute;
