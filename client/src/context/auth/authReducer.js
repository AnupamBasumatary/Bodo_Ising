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
  GOTO_ADMIN,
  REM_ADMIN,
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case UPDATE_USER_DETAILS_ERROR:
    case ADD_USER_DETAILS_ERROR:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        current: null,
        error: action.payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case ADD_USER_DETAILS:
      return {
        ...state,
        current: action.payload,
      };
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    case GOTO_ADMIN:
      return {
        ...state,
        isAdminPage: true,
      };
    case REM_ADMIN:
      return {
        ...state,
        isAdminPage: false,
      };
    default:
      throw new Error(
        `Unsupported type of: ${action.type} , ${action.payload}`
      );
  }
};

export default authReducer;
