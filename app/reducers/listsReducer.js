import types from '../constants/actionTypes';

const initialState = {
  ownLists: [],
  activeList: null,
  newList: '',
};

const listsReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case types.LISTS_LOADED: {
      return {
        ...state,
        ownLists: data,
        newList: '',
      };
    }
    case types.LISTS_TEXT_UPDATED: {
      return {
        ...state,
        newList: data,
      };
    }
    default: {
      return state;
    }
  }
};

export default listsReducer;
