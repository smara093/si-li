import types from '../constants/actionTypes';
import { getOrderedItems } from '../core/SimpleListUtilities';

const initialState = { items: [], newItem: '' };

const simpleListReducer = (state = initialState, action) => {
  const { items } = state;
  const { type, data } = action;
  switch (type) {
    case types.ADD_LIST_ITEM: {
      data.id = items.length;
      return {
        ...state,
        items: getOrderedItems(items.concat([data])),
        newItem: '',
      };
    }
    case types.REMOVE_LIST_ITEM: {
      items[data] = { ...items[data], isActive: false, lastModified: Date.now() };
      return {
        ...state,
        items: getOrderedItems(items),
      };
    }
    case types.UPDATE_TEXT: {
      return {
        ...state,
        newItem: data,
      };
    }
    case types.CLEAR_LIST: {
      return {
        ...state,
        items: [],
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
