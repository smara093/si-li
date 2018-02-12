import types from '../constants/actionTypes';
import * as firebaseDataStore from '../core/persistence/firebase';

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

export function saveItemToList(item) {
  return (dispatch) => {
    firebaseDataStore.saveItemToList(item, dispatch);
  };
}

export function initData() {
  return async (dispatch) => {
    console.log('init data');
    firebaseDataStore.initData(dispatch);
  };
}
