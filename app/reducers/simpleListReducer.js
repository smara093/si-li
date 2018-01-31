import { types } from '../constants/actionTypes';

const initialState = { items: [], newItem: '' };

const sortByDateDesc = (a, b) => {
  if (a.lastModified === b.lastModified) {
    return a.text.localeCompare(b.text);
  }

  return b.lastModified - a.lastModified;
};

const groupArrayBy = (arr, key) => {
  const reduced = arr.reduce((acc, current) => {
    (acc[current[key]] = acc[current[key]] || []).push(current);
    return acc;
  }, {});

  let r = [];
  const keys = Object.keys(reduced)
    .sort()
    .reverse();
  for (let i = 0; i < keys.length; i += 1) r = r.concat(reduced[keys[i]]);
  return r;
};

export const simpleListReducer = (state = initialState, action) => {
  const { items, newItem } = state;
  const { type, data } = action;
  switch (type) {
    case types.ADD_LIST_ITEM: {
      data.id = items.length;
      return {
        ...state,
        items: groupArrayBy([...items, data].sort(sortByDateDesc), 'isActive'),
        newItem: '',
      };
    }
    case types.REMOVE_LIST_ITEM: {
      items[data].isActive = false;
      return {
        ...state,
        items: groupArrayBy([...items].sort(sortByDateDesc), 'isActive'),
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
