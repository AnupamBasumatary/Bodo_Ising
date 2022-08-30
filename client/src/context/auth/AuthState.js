import React, { useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  ADD_USER_DETAILS,
  ADD_USER_DETAILS_ERROR,
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_ERROR,
} from '../types';

//custom hook
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

//Load User
export const loadUser = async (dispatch) => {
  const tokenAuth = localStorage.getItem('token');

  const config = {
    headers: {
      'content-type': 'application/json',
      'x-auth-token': tokenAuth,
    },
  };

  try {
    const res = await axios.get('/api/auth', { headers: config });
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Login User
export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/auth', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//Logout
export const logout = (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

//Clear Errors
export const clearErrors = (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

//Register user
export const register = async (dispatch, formData) => {
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };

  console.log(formData);
  try {
    const res = await axios.post('/api/users', formData, config);
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
  }
};

//USER DETAILS----
//Add User Details
export const addUserDet = async (dispatch, formData) => {
  console.log({ formData });
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/userdet', formData, config);
    console.log('User details' + res.data);
    dispatch({
      type: ADD_USER_DETAILS,
      payload: res.data,
    });
  } catch (err) {
    console.log('error');
    dispatch({
      type: ADD_USER_DETAILS_ERROR,
      payload: err.response.data.msg,
    });
  }
};

// Update User Details
export const updateUserDet = async (dispatch, formData) => {
  console.log('Update haha');
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  try {
    const res = await axios.put('/api/userdet', formData, config);
    console.log('updated user details' + res.data);
    dispatch({
      type: UPDATE_USER_DETAILS,
      payload: res.data,
    });
  } catch (err) {
    console.log('error');
    dispatch({
      type: UPDATE_USER_DETAILS_ERROR,
      payload: err.response.data.msg,
    });
  }
};

//AUTH STATE
const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
    current: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const { token, loading } = state;

  setAuthToken(token);

  useEffect(() => {
    setAuthToken(token);
    if (loading) {
      loadUser(dispatch);
    }
  }, [token, loading]);

  return (
    <AuthContext.Provider value={{ state: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
