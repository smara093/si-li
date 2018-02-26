import types from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  currentUser: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_REGISTERED':
    case 'LOGIN_USER_AUTHENTICATED': {
      console.log('user registered/authenticated', action.data);
      return {
        ...state,
        currentUser: action.data,
        isAuthenticated: true,
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
