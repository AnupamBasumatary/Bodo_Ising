import React from 'react';
import AdminState from '../../context/admin/AdminState';

const AdminIn = () => {
  return (
    <AdminState>
      <div>Admin Page</div>
      hello
      <a href='/AdminLogin'>Admin Login</a>
      <a href='/AdminRegister'>Admin Register</a>
    </AdminState>
  );
};

export default AdminIn;
