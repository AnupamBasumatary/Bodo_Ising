import React, { Fragment, useContext } from 'react';
import FoodContext from '../../../../context/food/foodContext';

import './side.css';

const Sidebar = () => {
  const foodContext = useContext(FoodContext);

  const { food } = foodContext;

  return (
    <Fragment>
      <div className='side'>
        {food.map((item) => (
          <h3>{item.price}</h3>
        ))}
      </div>
    </Fragment>
  );
};

export default Sidebar;
