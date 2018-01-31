export const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  UPDATE_TEXT: 'UPDATE_TEXT',
  CLEAR: 'CLEAR',
};

export const actionCreators = {
  add: item => ({ type: types.ADD, data: item }),
  remove: index => ({ type: types.REMOVE, data: index }),
  updateText: text => ({ type: types.UPDATE_TEXT, data: text }),
  clearItems: () => ({ type: types.CLEAR }),
};

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

export const reducer = (state = initialState, action) => {
  const { items } = state;
  const { type, data } = action;
  switch (type) {
    case types.ADD: {
      data.id = items.length;
      return {
        ...state,
        items: groupArrayBy([...items, data].sort(sortByDateDesc), 'isActive'),
        newItem: '',
      };
    }
    case types.REMOVE: {
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
    case types.CLEAR: {
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
