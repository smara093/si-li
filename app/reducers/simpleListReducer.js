import types from '../constants/actionTypes';
import { getOrderedItems } from '../core/utilities/SimpleListUtilities';

const initialState = {
  listName: '',
  owner: '',
  items: [],
  newItem: '',
};

const simpleListReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case types.UPDATE_TEXT: {
      return {
        ...state,
        newItem: data,
      };
    }
    case types.LIST_UPDATED: {
      return {
        ...state,
        items: getOrderedItems(data),
        newItem: '',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default simpleListReducer;
