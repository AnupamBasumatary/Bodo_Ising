import React, { useState, useContext, useEffect } from 'react';
import FoodContext from '../../../context/food/foodContext';

const AdminForm = () => {
  const foodContext = useContext(FoodContext);

  const { addFood, updateFood, clearCurrent, current } = foodContext;

  useEffect(() => {
    if (current !== null) {
      setFood(current);
    } else {
      setFood({
        code: '',
        name: '',
        description: '',
        price: '',
        category: '',
        diet: 'nonVeg',
      });
    }
  }, [foodContext, current]);

  const [food, setFood] = useState({
    code: '',
    name: '',
    description: '',
    price: '',
    category: '',
    diet: 'nonVeg',
  });

  const { code, name, description, price, category, diet } = food;

  const onChange = (e) => setFood({ ...food, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addFood(food);
    } else {
      updateFood(food);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <>
      <h1>Food Form</h1>
      <form onSubmit={onSubmit}>
        <h2>{current ? 'Edit Food Description' : 'Add Food Item'}</h2>
        <input
          type='text'
          placeholder='code'
          name='code'
          value={code}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='name'
          name='name'
          value={name}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='description'
          name='description'
          value={description}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='price'
          name='price'
          value={price}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='category'
          name='category'
          value={category}
          onChange={onChange}
        />
        <h3>Diet Type</h3>
        <input
          type='radio'
          name='diet'
          value='nonVeg'
          checked={diet === 'nonVeg'}
          onChange={onChange}
        />{' '}
        NonVeg
        <input
          type='radio'
          name='diet'
          value='veg'
          checked={diet === 'veg'}
          onChange={onChange}
        />{' '}
        Veg
        <div>
          <input
            type='submit'
            value={current ? 'Update Food' : 'Add Food Item'}
          />
        </div>
        {current && (
          <div>
            <button onClick={clearAll}>Clear</button>
          </div>
        )}
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default AdminForm;
