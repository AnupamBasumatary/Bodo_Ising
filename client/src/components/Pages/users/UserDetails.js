import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import AlertContext from '../../../context/alert/alertContext';
import {
  useAuth,
  addUserDet,
  updateUserDet,
} from '../../../context/auth/AuthState';

const UserDetails = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [authState, authDispatch] = useAuth();
  const { current, error, clearErrors, user } = authState;

  // const navigate = useNavigate();

  useEffect(() => {
    if (user.firstName !== null) {
      setUserDet(user);
    } else {
      setUserDet({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        address3: '',
        phone: '',
        packageType: 'standard',
      });
    }
  }, [user, current]);

  const [userDet, setUserDet] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    address3: '',
    phone: '',
    packageType: 'standard',
  });

  const {
    firstName,
    lastName,
    address1,
    address2,
    address3,
    phone,
    packageType,
  } = userDet;

  const onChange = (e) => {
    setUserDet({ ...userDet, [e.target.name]: e.target.value });
  };

  const state = {
    button: 1,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.button === 1) {
      updateUserDet(authDispatch, {
        firstName,
        lastName,
        address1,
        address2,
        address3,
        phone,
        packageType,
      });
    }
    if (state.button === 2) {
      if (
        error === 'First name is required' ||
        error === 'Address Line 1 is required' ||
        error === 'phone number is required'
      ) {
        setAlert(error, 'danger');
        clearErrors(authDispatch);
      } else {
        addUserDet(authDispatch, {
          firstName,
          lastName,
          address1,
          address2,
          address3,
          phone,
          packageType,
        });
      }
    }
  };

  return (
    <div>
      <h1>User Details</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='firstName'>FirstName</label>
          <input
            type='text'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
          <label htmlFor='lastName'>LastName</label>
          <input
            type='text'
            name='lastName'
            value={lastName}
            onChange={onChange}
          />
          <label htmlFor='address1'>Address1</label>
          <input
            type='text'
            name='address1'
            value={address1}
            onChange={onChange}
          />
          <label htmlFor='address2'>Address2</label>
          <input
            type='text'
            name='address2'
            value={address2}
            onChange={onChange}
          />
          <label htmlFor='address3'>address3</label>
          <input
            type='text'
            name='address3'
            value={address3}
            onChange={onChange}
          />
          <label htmlFor='phone'>Phone</label>
          <input type='text' name='phone' value={phone} onChange={onChange} />
        </div>
        {user.firstName || current ? (
          <button onClick={() => (state.button = 1)} type='submit' name='btn1'>
            Update
          </button>
        ) : (
          <button onClick={() => (state.button = 2)} type='submit' name='btn2'>
            Set
          </button>
        )}
      </form>
    </div>
  );
};

export default UserDetails;
