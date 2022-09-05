import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpVal, setInpval] = useState({
    email: '',
    password: '',
  });

  const history = useNavigate();

  const { email, password } = inpVal;

  const onChange = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = inpVal;

    if (email === '') {
      alert('Please enter your email');
    } else if (!email.includes('@')) {
      alert('Please Enter Valid Email');
    } else if (password === '') {
      alert('Please enter password');
    } else if (password.length < 6) {
      alert('Password must be atleast 6 characters');
    } else {
      const data = await fetch('/api/admin1/adminLogin', {
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
        localStorage.setItem('admintoken', res.result.token);
        history('/AdminDashboard');
        setInpval({
          ...inpVal,
          email: '',
          password: '',
        });
      }
    }
  };

  return (
    <>
      <h1>Admin Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <div>
            <input
              type={!passShow ? 'password' : 'text'}
              name='password'
              value={password}
              onChange={onChange}
              minLength='6'
            />
            <div onClick={() => setPassShow(!passShow)}>
              {!passShow ? 'Show' : 'Hide'}
            </div>
          </div>
        </div>
        <input type='submit' value='Sign In' />
        <p>
          No account ?<NavLink to='/AdminRegister'>Register</NavLink>
        </p>
      </form>
    </>
  );
};

export default AdminLogin;
