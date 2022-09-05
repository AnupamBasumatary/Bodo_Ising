import React from 'react';
import FoodState from '../../../context/food/FoodState';
import AdminFood from './AdminFood';
import AdminForm from './AdminForm';
import FoodFilter from '../../food/FoodFilter';

const AdminFoodUpdate = () => {
  return (
    <FoodState>
      <AdminForm />
      <AdminFood />
      <FoodFilter />
    </FoodState>
  );
};

export default AdminFoodUpdate;
