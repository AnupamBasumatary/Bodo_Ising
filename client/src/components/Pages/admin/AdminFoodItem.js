import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../../../context/food/foodContext';

const AdminFoodItem = ({ food }) => {
  const foodContext = useContext(FoodContext);
  const { deleteFood, setCurrent, clearCurrent } = foodContext;

  const { id, price, name } = food;

  const onDelete = () => {
    deleteFood(id);
    clearCurrent();
  };

  return (
    <div>
      <h1>
        {price} {name}
      </h1>
      <p>
        <button onClick={() => setCurrent(food)}>Edit</button>
      </p>
      <p>
        <button onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

AdminFoodItem.propTypes = {
  food: PropTypes.object.isRequired,
};

export default AdminFoodItem;
