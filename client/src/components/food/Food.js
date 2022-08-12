import React, { Fragment, useContext } from 'react';
import FoodItem from './FoodItem';
import FoodContext from '../../context/food/foodContext';

const Food = () => {
  const foodContext = useContext(FoodContext);

  const { food } = foodContext;

  return (
    <Fragment>
      <div>
        {food.map((item) => (
          <FoodItem key={item.id} food={item} />
        ))}
      </div>
    </Fragment>
  );
};

export default Food;
