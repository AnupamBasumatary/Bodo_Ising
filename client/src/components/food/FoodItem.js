import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

const FoodItem = ({ food }) => {
  const { name, price } = food;

  return (
    <div>
      <h3>
        {name},{price}
      </h3>
    </div>
  );
};

FoodItem.propTypes = {
  food: PropTypes.object.isRequired,
};

export default FoodItem;
