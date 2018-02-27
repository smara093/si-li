import types from '../constants/actionTypes';

const initialState = {
  errorMessage: '',
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTRATION_ERROR_OCURRED: {
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

export default registrationReducer;
