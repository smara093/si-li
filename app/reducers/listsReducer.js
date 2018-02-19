import types from '../constants/actionTypes';

const initialState = {
  ownLists: [],
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
    case types.LIST_UPDATED: {
      return {
        ...state,
        ownLists: state.ownLists.map((l) => {
          if (l.id === data.id) return { ...data, isActive: true };
          return { ...l };
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export default listsReducer;
