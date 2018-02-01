import types from '../constants/actionTypes';

export function add(item) {
  return { type: types.ADD_LIST_ITEM, data: item };
}

export function remove(index) {
  return { type: types.REMOVE_LIST_ITEM, data: index };
}

export function clearItems() {
  return { type: types.CLEAR_LIST };
}

// TODO: move this to own component actions, should be reusable on its own.
export function updateText(text) {
  return { type: types.UPDATE_TEXT, data: text };
}
