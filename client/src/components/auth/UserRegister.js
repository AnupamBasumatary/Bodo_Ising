import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, register, clearErrors } from '../../context/auth/AuthState';
import LoadUser from '../Pages/users/LoadUser';

const UserRegister = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all Fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register(authDispatch, {
        name,
        email,
        password,
      });
    }
  };

  if (isAuthenticated) return <LoadUser />;

  return (
    <div>
      <h1>User Account Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
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
            minLength='6'
          />
        </div>
        <div>
          <label htmlFor='password2'>Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <input type='submit' value='Register' />
      </form>
    </div>
  );
};

export default UserRegister;
