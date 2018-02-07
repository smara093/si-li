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
      let updatedItems = [];
      if (items[data].isActive === false) {
        updatedItems = items.slice(0, data).concat(items.slice(data + 1));
      } else {
        items.splice(data, 1, {
          ...items[data],
          isActive: false,
          lastModified: Date.now(),
        });
        updatedItems = items;
      }
      return {
        ...state,
        items: getOrderedItems(updatedItems),
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
