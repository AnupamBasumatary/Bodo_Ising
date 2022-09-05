import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../ContextProvider/UserContext';

const UserDashBoard = () => {
  const { userData, setuserData } = useContext(UserDataContext);

  const navigate = useNavigate();

  const userDashBoardValid = async () => {
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
      navigate('/UserDashBoard');
    }
  };

  useEffect(() => {
    userDashBoardValid();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div>
        User DashBoard
        <div>Hi {userData ? userData.email : 'No name'}</div>
        <br />
        <button
          onClick={() => {
            navigate('/UserDetails');
          }}
        >
          User Details
        </button>
        <button
          type='button'
          onClick={() => {
            navigate('/UserOrder');
          }}
          name='order'
        >
          User Order
        </button>
      </div>
    </>
  );
};

export default UserDashBoard;
