/* eslint import/prefer-default-export: "off", no-unused-vars: "off" */
import * as firebaseDataStore from '../core/persistence/firebase';

import types from '../constants/actionTypes';
// TODO: rename actions to something consistent

export function selectList(list) {
  console.log('selected list: ', list);

  return {
    type: types.LISTS_SELECTED,
    data: list,
  };
}

export function addList(list, owner) {
  return dispatch =>
    firebaseDataStore
      .addList(list, owner.id)
      .then(
        response => dispatch({ type: types.LISTS_LOADED, data: response }),
        error => console.log('error', error),
      );
}

export function textUpdated(text) {
  return {
    type: types.LISTS_TEXT_UPDATED,
    data: text,
  };
}
