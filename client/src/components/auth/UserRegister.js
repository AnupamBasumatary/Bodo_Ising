import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';

import LoadUser from '../Pages/users/LoadUser';
import { NavLink, useNavigate } from 'react-router-dom';

const UserRegister = (props) => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

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

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all Fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      const data = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const res = await data.json();

      if (res.status == 201) {
        localStorage.setItem('usertoken', res.token);
        alert('USer Registered Successfully');
        navigate('/UserDashBoard');
        setUser({
          ...user,
          name: '',
          email: '',
          password: '',
          password2: '',
        });
      }
    }
  };

  // if (isAuthenticated) return <LoadUser />;

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
      <p>
        Already an User ?<NavLink to='/Login'>Sign In</NavLink>
      </p>
    </div>
  );
};

export default UserRegister;
