import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FoodContext from './foodContext';
import foodReducer from './foodReducer';
import {
  ADD_FOOD,
  DELETE_FOOD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_FOOD,
  FILTER_FOOD,
  CLEAR_FILTER,
} from '../types';

const FoodState = (props) => {
  const initialState = {
    food: [
      {
        id: 1,
        code: 'S_N_1',
        name: 'Dao',
        description: 'Chicken',
        price: '250',
        category: 'starter',
        diet: 'nonveg',
      },
      {
        id: 2,
        code: 'L_N_1',
        name: 'Oma',
        description: 'Pork',
        price: '300',
        category: 'lunch',
        diet: 'nonveg',
      },
      {
        id: 3,
        code: 'D_N_1',
        name: 'Bwrma',
        description: 'Mutton',
        price: '450',
        category: 'dinner',
        diet: 'nonveg',
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(foodReducer, initialState);

  //Add Food
  const addFood = (food) => {
    food.id = uuidv4();
    dispatch({ type: ADD_FOOD, payload: food });
  };

  //Delete Food
  const deleteFood = (id) => {
    dispatch({ type: DELETE_FOOD, payload: id });
  };

  //Set Current
  const setCurrent = (food) => {
    dispatch({ type: SET_CURRENT, payload: food });
  };

  //Clear Current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update Food
  const updateFood = (food) => {
    dispatch({ type: UPDATE_FOOD, payload: food });
  };

  //Filter Food
  const filterFood = (text) => {
    dispatch({ type: FILTER_FOOD, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <FoodContext.Provider
      value={{
        food: state.food,
        current: state.current,
        filtered: state.filtered,
        addFood,
        deleteFood,
        updateFood,
        setCurrent,
        clearCurrent,
        filterFood,
        clearFilter,
      }}
    >
      {props.children}
    </FoodContext.Provider>
  );
};

export default FoodState;
