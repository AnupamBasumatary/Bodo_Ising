import React, { useContext } from 'react';
import './style/navbar-style.css';
import mainLogo from './style/Logo-1.jpg';
import { UserDataContext } from '../../ContextProvider/UserContext';
import { LoginContext } from '../../ContextProvider/Context';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setuserData } = useContext(UserDataContext);
  const { loginData, setLoginData } = useContext(LoginContext);

  const navigate = useNavigate();

  const usertoken = localStorage.getItem('usertoken');
  const admintoken = localStorage.getItem('admintoken');

  const onLogout = () => {
    navigate('/');
    setuserData(false);
    localStorage.removeItem('usertoken');
  };

  const onAdminLogout = async (e) => {
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

    if (data.status === 201) {
      console.log('LogOut User');
      localStorage.removeItem('admintoken');
      setLoginData(false);
      navigate('/AdminIn');
    } else {
      console.log('Error');
    }
  };

  return (
    <div className='navbar'>
      <img src={mainLogo} className='navbar__logo' alt='Logo'></img>
      <ul className='navbar__link'>
        <li className='navbar--item'>
          <a href='/' className='navbar__link--item'>
            Home
          </a>
        </li>
        <li className='navbar--item'>
          <a href='/Menu' className='navbar__link--item'>
            Menu
          </a>
        </li>
        <li className='navbar--item'>
          <a href='/Gallery' className='navbar__link--item'>
            Gallery
          </a>
        </li>
        <li className='navbar--item'>
          <a href='/About' className='navbar__link--item'>
            About Us
          </a>
        </li>
        <li className='navbar--item'>
          {usertoken ? (
            <button onClick={onLogout} className='navbar__link--item'>
              LogOut
            </button>
          ) : (
            <a href='/Login' className='navbar__link--item'>
              Log In
            </a>
          )}
        </li>
        <li>
          {usertoken ? (
            <a href='/UserDashBoard' className='navbar__link--item'>
              User
            </a>
          ) : (
            ''
          )}
        </li>
        <li className='navbar--item'>
          {admintoken ? (
            <button onClick={onAdminLogout} className='navbar__link--item'>
              LogOut
            </button>
          ) : (
            ''
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
