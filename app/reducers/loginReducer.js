import types from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  errorMessage: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_AUTHENTICATED: {
      return {
        ...state,
        currentUser: action.data,
        isAuthenticated: true,
        errorMessage: '',
      };
    }
    case types.LOGIN_ERROR_OCURRED: {
      return {
        ...state,
        errorMessage: action.data,
      };
    }
    case types.ACCOUNT_USER_SIGNED_OUT: {
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        errorMessage: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
