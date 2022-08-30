import React from 'react';
import './style/navbar-style.css';
import mainLogo from './style/Logo-1.jpg';
import { useAuth, logout } from '../../../context/auth/AuthState';
import { Navigate } from 'react-router-dom';

const Navbar = () => {
  const [authState, authDispatch] = useAuth();
  const { user } = authState;

  const onLogout = () => {
    // <Navigate to='/UserLogin' />;
    logout(authDispatch);
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
          <a href='/Login' className='navbar__link--item'>
            Log In
          </a>
        </li>
        <li className='navbar--item'>
          {/* if(user)
          { */}
          <button onClick={onLogout} className='navbar__link--item'>
            LogOut
          </button>
          {/* } */}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
