import React from 'react';
import './style/footer.css';
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlinePhone,
} from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';

const Footer = () => {
  return (
    <div className='footer'>
      <section className='footer__grid'>
        <div className='copy'>
          &copy; Bodo Ising - Developed by Anupam - 2022
        </div>
        <div className='logo'>
          <a
            href='https://m.facebook.com/BODO-ISING-DELHI-104486648192774/'
            className='link'
          >
            <svg>
              <AiOutlineFacebook />
            </svg>
          </a>
          <a href='https://www.instagram.com/bodoising/?hl=en' className='link'>
            <svg>
              <AiOutlineInstagram />
            </svg>
          </a>
          <a href='https://www.instagram.com/bodoising/?hl=en' className='link'>
            <svg>
              <AiOutlinePhone />
            </svg>
          </a>
          <a
            href='https://www.google.com/maps/place/BODO+ISING/@28.5607724,77.1938284,15z/data=!4m2!3m1!1s0x0:0x2261eb55992110f7?sa=X&ved=2ahUKEwid6a7gg_34AhUOSmwGHXYYB2IQ_BJ6BAg-EAU'
            className='link'
          >
            <svg>
              <GoLocation />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Footer;
