import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, login, clearErrors } from '../../context/auth/AuthState';
import LoadUser from '../Pages/users/LoadUser';
import { useNavigate } from 'react-router-dom';

const UserLogin = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter all Fields', 'danger');
    } else if (email === 'Admin@admin.com' && password === 'admin@123') {
      return navigate('/AdminIn', { replace: true });
    } else {
      login(authDispatch, {
        email,
        password,
      });
    }
  };

  let navigate = useNavigate();

  if (isAuthenticated) return <LoadUser />;
  // if (isAdminPage) return navigate('/AdminIn', { replace: true });

  return (
    <div>
      <h1>User Account Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default UserLogin;
