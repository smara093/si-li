import types from '../constants/actionTypes';

const initialState = {
  userName: 'Smara',
  isAuthenticated: false,
  currentUser: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_UPDATE_USERNAME: {
      return {
        ...state,
        userName: action.data,
      };
    }
    case types.LOGIN_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.data,
        userName: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
