import types from '../constants/actionTypes';
import { getOrderedItems } from '../core/SimpleListUtilities';

const initialState = { items: [], newItem: '' };

const simpleListReducer = (state = initialState, action) => {
  const { items } = state;
  const { type, data } = action;
  switch (type) {
    case types.ADD_LIST_ITEM: {
      data.id = items.length;
      items.push(data);
      return {
        ...state,
        items: getOrderedItems(items),
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
