import types from '../constants/actionTypes';
import { getOrderedItems } from '../core/utilities/SimpleListUtilities';

const initialState = {
  listName: '',
  userId: '',
  items: [],
  newItem: '',
  id: '',
};

const activeListReducer = (state = initialState, action) => {
  const { type, data } = action;

  console.log('reducing activeList for action ', type);

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
        items: getOrderedItems(data.items),
        newItem: '',
      };
    }
    case types.LISTS_SELECTED: {
      return {
        ...state,
        items: data.items || [],
        id: data.id,
        userId: data.userId,
        newItem: '',
        listName: data.name,
      };
    }
    default: {
      return state;
    }
  }
};

export default activeListReducer;
