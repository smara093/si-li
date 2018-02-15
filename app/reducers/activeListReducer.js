import types from '../constants/actionTypes';
import { getOrderedItems } from '../core/utilities/SimpleListUtilities';

const initialState = {
  listName: '',
  owner: '',
  items: [],
  newItem: '',
};

const activeListReducer = (state = initialState, action) => {
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
    case types.LIST_SELECTED: {
      console.log('selected list', data);
      return {
        ...state,
        activeList: Object.assign({}, data),
      };
    }
    default: {
      return state;
    }
  }
};

export default activeListReducer;
