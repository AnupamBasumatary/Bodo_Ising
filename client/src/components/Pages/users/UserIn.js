import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('usertoken');
    token ? navigate('/UserDashBoard') : navigate('/UserLogin');
  });
  return <></>;
};

export default UserIn;
