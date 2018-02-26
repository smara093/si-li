import types from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  errorMessage: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_REGISTERED':
    case 'LOGIN_USER_AUTHENTICATED': {
      return {
        ...state,
        currentUser: action.data,
        isAuthenticated: true,
        errorMessage: '',
      };
    }
    case 'LOGIN_ERROR_OCURRED': {
      return {
        ...state,
        errorMessage: action.data,
      };
    }
    case types.LOGIN_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
