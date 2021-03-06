/* eslint import/prefer-default-export: "off", no-unused-vars: "off" */
import * as firebaseDataStore from '../core/persistence/firebase';

import types from '../constants/actionTypes';

export function selectList(list) {
  return {
    type: types.LISTS_SELECTED_LIST,
    data: list,
  };
}

export function addList(list, owner) {
  return dispatch =>
    firebaseDataStore
      .addList(list, owner.id)
      .then(
        response => dispatch({ type: types.LISTS_LOADED, data: response }),
        error => console.warn('Add list failed.', error),
      );
}

export function textUpdated(text) {
  return {
    type: types.LISTS_UPDATED_TEXT,
    data: text,
  };
}

export function removeList(list) {
  return dispatch =>
    firebaseDataStore
      .removeList(list)
      .then(() => firebaseDataStore.getLists(list.userId))
      .then(response => dispatch({ type: types.LISTS_LOADED, data: response }));
}
