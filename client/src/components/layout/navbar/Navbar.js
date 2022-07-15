import React from 'react';
import './style/navbar-style.css';
import mainLogo from './style/Logo-1.jpg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={mainLogo} className='navbar__logo' alt='Logo'></img>
      <ul className='navbar__link'>
        <li className='navbar--item'>
          <a href='/Home' className='navbar__link--item'>
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
          <a href='/About-Us' className='navbar__link--item'>
            About Us
          </a>
        </li>
        <li className='navbar--item'>
          <a href='/Log-in' className='navbar__link--item'>
            Log In
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
