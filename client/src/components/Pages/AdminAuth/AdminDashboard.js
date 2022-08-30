import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../ContextProvider/Context';

const AdminDashboard = () => {
  const { loginData, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const logOutUser = async () => {
    let token = localStorage.getItem('admintoken');

    const res = await fetch('/api/admin1/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        Accept: 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
      console.log('LogOut User');
      localStorage.removeItem('admintoken');
      setLoginData(false);
      history('/AdminIn');
    } else {
      console.log('Error');
    }
  };

  //Getting Admin Details
  const AdminDashboardValid = async () => {
    let token = localStorage.getItem('admintoken');

    const res = await fetch('/api/admin1/validAdmin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      history('*');
    } else {
      setLoginData(data);
      history('/AdminDashboard');
    }
  };

  useEffect(() => {
    AdminDashboardValid();
  }, []);

  return (
    <>
      <div>AdminDashboard</div>
      admin Email : {loginData ? loginData.validAdminOne.adminName : 'No name'}
      @.com
      <div>
        <button
          onClick={() => {
            logOutUser();
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminDashboard;
