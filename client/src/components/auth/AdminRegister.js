import React, { useContext, useState, useEffect } from 'react';
// import AlertContext from '../../context/alert/alertContext';
// import {
//   useAdminAuth,
//   clearAdminErrors,
//   // registerAdmin,
// } from '../../context/admin/AdminState';

const AdminRegister = (props) => {
  // const alertContext = useContext(AlertContext);
  // const { setAlert } = alertContext;

  // const [adminState, adminDispatch] = useAdminAuth();
  // const { error, isAuthenticated } = adminState;

  // useEffect(() => {
  //   if (error === 'Admin Email already in use') {
  //     setAlert(error, 'danger');
  //     clearAdminErrors(adminDispatch);
  //   }
  // }, [error, isAuthenticated, props.history, setAlert, adminDispatch]);

  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = admin;

  const onChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: [e.target.value] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      // setAlert('Please enter all fields', 'danger');
      alert('Enter all fields');
    } else {
      // console.log(name, email, password);
      //   registerAdmin(adminDispatch, {
      //     name,
      //     email,
      //     password,
      //   });
      // }

      const data = await fetch('http://localhost:5000/api/admin', {
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
      console.log(res);
    }
  };

  return (
    <>
      <h1>Admin Register</h1>
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
        <input type='submit' value='Register' />
      </form>
    </>
  );
};

export default AdminRegister;
