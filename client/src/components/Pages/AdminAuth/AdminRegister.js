import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminLogin = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpVal, setInpval] = useState({
    adminName: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const { adminName, email, password, cpassword } = inpVal;

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

    const { adminName, email, password, cpassword } = inpVal;

    if (adminName === '') {
      alert('Please enter your name');
    } else if (email === '') {
      alert('Please enter your email');
    } else if (!email.includes('@')) {
      alert('Please Enter Valid Email');
    } else if (password === '') {
      alert('Please enter password');
    } else if (password.length < 6) {
      alert('Password must be atleast 6 characters');
    } else if (cpassword === '') {
      alert('Please enter confirm password');
    } else if (cpassword.length < 6) {
      alert('Confirm Password must be atleast 6 characters');
    } else {
      const data = await fetch('/api/admin1/adminRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminName,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();

      if (res.status == 201) {
        alert('Admin Registered Successfully');
        setInpval({
          ...inpVal,
          adminName: '',
          email: '',
          password: '',
          cpassword: '',
        });
      }
    }
  };

  return (
    <>
      <h1>Admin Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='adminName'
            value={adminName}
            onChange={onChange}
          />
        </div>
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

        <div>
          <label htmlFor='cpassword'> Confirm Password</label>
          <div>
            <input
              type={!cpassShow ? 'password' : 'text'}
              name='cpassword'
              value={cpassword}
              onChange={onChange}
              minLength='6'
            />
            <div onClick={() => setCPassShow(!cpassShow)}>
              {!cpassShow ? 'Show' : 'Hide'}
            </div>
          </div>
        </div>
        <input type='submit' value='Register' />
        <p>
          Got account ?<NavLink to='/AdminLogin'>Log In</NavLink>
        </p>
      </form>
    </>
  );
};

export default AdminLogin;
