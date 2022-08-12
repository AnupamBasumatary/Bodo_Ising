import React, { useContext, useRef, useEffect } from 'react';
import FoodContext from '../../context/food/foodContext';

const FoodFilter = () => {
  const foodContext = useContext(FoodContext);
  const text = useRef('');

  const { filterFood, clearFilter, filtered } = foodContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterFood(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <>
      <h1>Search Food Item</h1>
      <form>
        <input ref={text} type='text' onChange={onChange} />
      </form>
    </>
  );
};

export default FoodFilter;
