import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { NavLink, useNavigate } from 'react-router-dom';

const UserLogin = (props) => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const navigate = useNavigate();

  // useEffect(() => {
  //   let token = localStorage.getItem('usertoken');
  //   if (token) {
  //     navigate('/UserDashBoard');
  //   } else {
  //     navigate('/UserLogin');
  //   }
  // }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    if (email === '' || password === '') {
      setAlert('Please enter all Fields', 'danger');
    } else if (email === 'Admin@admin.com' && password === 'admin@123') {
      return navigate('/AdminIn', { replace: true });
    } else {
      const data = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();

      if (res.status == 201) {
        localStorage.setItem('usertoken', res.token);
        navigate('/UserDashBoard');
        setUser({
          email: '',
          password: '',
        });
      }
    }
  };

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
      <p>
        No User account ?<NavLink to='/Register'>Register</NavLink>
      </p>
    </div>
  );
};

export default UserLogin;
