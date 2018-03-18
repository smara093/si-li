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
    default: {
      return state;
    }
  }
};

export default loginReducer;
