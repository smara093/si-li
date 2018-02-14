import types from '../constants/actionTypes';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_UPDATE_USERNAME: {
      return {
        ...state,
        userName: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
