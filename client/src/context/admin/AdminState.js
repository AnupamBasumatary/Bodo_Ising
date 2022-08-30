import React, { useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import AdminContext from './adminContext';
import adminReducer from './adminReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LOADED,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_CLEAR_ERRORS,
} from '../adminTypes';

//Custom Hook
export const useAdminAuth = () => {
  const { state, dispatch } = useContext(AdminContext);
  return [state, dispatch];
};

//Load Admin
export const loadAdmin = async (dispatch) => {
  const tokenAdminAuth = localStorage.getItem('adminToken');

  const config = {
    headers: {
      'content-type': 'application/json',
      'x-auth-token': tokenAdminAuth,
    },
  };

  try {
    const res = await axios.get('/api/adminAuth', { headers: config });
    dispatch({
      type: ADMIN_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_AUTH_ERROR,
      payload: err.response.data.msg,
    });
  }
};

//Login Admin
export const loginAdmin = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/adminAuth', formData);
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

//Register Admin
export const registerAdmin = async (dispatch, formData) => {
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };

  const { name, email, password } = formData;
  console.log('from state: name: ' + name);

  try {
    const res = await axios.post(
      '/api/admin',
      { name, email, password },
      { headers: config }
    );
    console.log(res.data);
    dispatch({
      type: ADMIN_REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

//LogOut Admin
export const logoutAdmin = (dispatch) => {
  dispatch({
    type: ADMIN_LOGOUT,
  });
};

//Clear Errors
export const clearAdminErrors = (dispatch) => {
  dispatch({ type: ADMIN_CLEAR_ERRORS });
};

//ADMIN STATE
const AdminState = ({ children }) => {
  const initialState = {
    adminToken: localStorage.getItem('adminToken'),
    isAuthenticated: null,
    loading: true,
    error: null,
    admin: null,
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);
  const { adminToken, loading } = state;

  setAuthToken(adminToken);

  useEffect(() => {
    setAuthToken(adminToken);
    if (loading) {
      loadAdmin(dispatch);
    }
  }, [adminToken, loading]);

  return (
    <AdminContext.Provider value={{ state: state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminState;
