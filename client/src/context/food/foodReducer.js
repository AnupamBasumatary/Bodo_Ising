import {
  ADD_FOOD,
  CLEAR_CURRENT,
  DELETE_FOOD,
  FILTER_FOOD,
  SET_CURRENT,
  UPDATE_FOOD,
  CLEAR_FILTER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_FOOD:
      return {
        ...state,
        food: [...state.food, action.payload],
      };
    case DELETE_FOOD:
      return {
        ...state,
        food: state.food.filter((item) => item.id !== action.payload),
      };
    case UPDATE_FOOD:
      return {
        ...state,
        food: state.food.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_FOOD:
      return {
        ...state,
        filtered: state.food.filter((item) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return item.name.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
