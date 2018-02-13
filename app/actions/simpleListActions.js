import types from '../constants/actionTypes';
import * as firebaseDataStore from '../core/persistence/firebase';

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
  return (dispatch) => {
    firebaseDataStore.initData(dispatch);
  };
}

export function removeItemFromList(item) {
  return () => {
    if (item.isActive === true) {
      firebaseDataStore.updateItem(Object.assign({}, item, { isActive: false, lastModified: Date.now() }));
    } else {
      firebaseDataStore.removeItem(item);
    }
  };
}

export function clearList() {
  return () => {
    firebaseDataStore.clearList();
  };
}
