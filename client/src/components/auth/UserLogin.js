import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import {
  useAuth,
  login,
  clearErrors,
  gotoAdmin,
} from '../../context/auth/AuthState';
import LoadUser from '../Pages/users/LoadUser';
import { Navigate } from 'react-router-dom';
// import AdminIn from './AdminIn';
import About from '../../About';

const UserLogin = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated, isAdminPage } = authState;

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
      console.log('jadw ra');
      gotoAdmin(authDispatch);
    } else {
      login(authDispatch, {
        email,
        password,
      });
    }
  };

  if (isAuthenticated) return <LoadUser />;
  if (isAdminPage) return <About />;

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

// axios
//   .post('/api/auth', formData)
//   .then((res) => {
//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data,
//     });
//   })
//   .then((res) => loadUser(res))
//   .catch(
//     (error) => {
//       dispatch({
//         type: LOGIN_FAIL,
//         payload: error.response.data.msg,
//       });
//     } // loadUser(dispatch);
//   );
