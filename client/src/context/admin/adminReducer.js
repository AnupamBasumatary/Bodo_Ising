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

const adminReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_SUCCESS:
    case ADMIN_REGISTER_SUCCESS:
      localStorage.setItem('adminToken', action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case ADMIN_REGISTER_FAIL:
    case ADMIN_LOGIN_FAIL:
    case ADMIN_AUTH_ERROR:
    case ADMIN_LOGOUT:
      localStorage.removeItem('adminToken');
      return {
        ...state,
        adminToken: null,
        isAuthenticated: false,
        loading: true,
        error: action.payload,
        admin: null,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isAdminAuthenticated: true,
        loading: false,
        admin: action.payload,
      };
    case ADMIN_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      throw new Error(
        `Unsupported type of: ${action.type} , ${action.payload}`
      );
  }
};

export default adminReducer;
