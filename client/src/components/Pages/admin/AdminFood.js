import React, { Fragment, useContext } from 'react';
import FoodContext from '../../../context/food/foodContext';
import AdminFoodItem from './AdminFoodItem';

const AdminFood = () => {
  const foodContext = useContext(FoodContext);

  const { food, filtered } = foodContext;

  if (food.length === 0) {
    return <h3>Please add a food item</h3>;
  }

  return (
    <Fragment>
      <h1>Food List</h1>
      {filtered !== null
        ? filtered.map((item) => <AdminFoodItem key={item.id} food={item} />)
        : food.map((item) => <AdminFoodItem key={item.id} food={item} />)}
      <br />
      <br />
      <br />
      <br />
    </Fragment>
  );
};

export default AdminFood;
