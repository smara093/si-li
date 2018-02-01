import types from '../constants/actionTypes';
import SimpleListManager from '../core/SimpleListManager';

const initialState = { items: [], newItem: '' };

const simpleListReducer = (state = initialState, action) => {
  const { items } = state;
  const { type, data } = action;
  const simpleListManager = new SimpleListManager(items);
  switch (type) {
    case types.ADD_LIST_ITEM: {
      simpleListManager.addItem(data.text);
      return {
        ...state,
        items: simpleListManager.orderedItems.slice(),
        newItem: '',
      };
    }
    case types.REMOVE_LIST_ITEM: {
      simpleListManager.removeItem(data);
      return {
        ...state,
        items: simpleListManager.orderedItems.slice(),
      };
    }
    case types.UPDATE_TEXT: {
      return {
        ...state,
        newItem: data,
      };
    }
    case types.CLEAR_LIST: {
      simpleListManager.clear();
      return {
        ...state,
        items: simpleListManager.orderedItems.slice(),
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
