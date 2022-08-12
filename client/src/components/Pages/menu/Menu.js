import React from 'react';
import FoodState from '../../../context/food/FoodState';
import Food from '../../food/Food';
import Sidebar from './sidebar/Sidebar';

import './menu.css';

const Menu = () => {
  return (
    <FoodState>
      <div className='menu'>
        <div className='side'>
          <Sidebar />
        </div>
        <div className='card'>
          <Food />
        </div>
      </div>
    </FoodState>
  );
};

export default Menu;
