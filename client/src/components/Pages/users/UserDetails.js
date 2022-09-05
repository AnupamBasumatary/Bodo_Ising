import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../../context/alert/alertContext';
import { UserDataContext } from '../../ContextProvider/UserContext';

const UserDetails = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { userData, setuserData } = useContext(UserDataContext);

  const navigate = useNavigate();

  const [userDet, setuserDet] = useState({
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

  const getUserDetails = async () => {
    let token = localStorage.getItem('usertoken');

    const res = await fetch('/api/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      navigate('*');
    } else {
      setuserData(data);
    }
  };

  useEffect(() => {
    getUserDetails();
    if (userData.firstName) {
      setuserDet({
        firstName: userData.firstName,
        lastName: userData.lastName,
        address1: userData.address1,
        address2: userData.address2,
        address3: userData.address3,
        phone: userData.phone,
        packageType: userData.packageType,
      });
    }
    //eslint-disable-next-line
  }, [userData.firstName]);

  const onChange = (e) => {
    setuserDet({ ...userDet, [e.target.name]: e.target.value });
  };

  const state = {
    button: 1,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state.button === 1) {
      if (!firstName) {
        setAlert('Cant leave firstNAme empty', 'danger');
      } else if (!address1) {
        setAlert('Cant leave address1 empty', 'danger');
      } else if (!phone) {
        setAlert('Cant leave phone number blank', 'danger');
      } else {
        let token = localStorage.getItem('usertoken');

        const data = await fetch('/api/userdet', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            address1,
            address2,
            address3,
            phone,
            packageType,
          }),
        });

        const res = await data.json();

        if (res.status == 201) {
          setuserData(res.userDet);
        } else {
          navigate('*');
        }
      }
    }
    if (state.button === 2) {
      if (!firstName) {
        alert('PLease enter first Name');
      } else if (!address1) {
        alert('Please enter address 1');
      } else if (!phone) {
        alert('PLease enter phone number ');
      } else {
        let token = localStorage.getItem('usertoken');

        const data = await fetch('/api/userdet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            address1,
            address2,
            address3,
            phone,
            packageType,
          }),
        });

        const res = await data.json();

        if (res.status == 201) {
          setuserData(res.userDet);
        } else {
          navigate('*');
        }
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
        {userData.firstName ? (
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
