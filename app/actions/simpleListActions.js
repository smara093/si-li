import types from '../constants/actionTypes';
import * as firebaseDataStore from '../core/persistence/firebase';

// TODO: move this to own component actions, should be reusable on its own.
export function updateText(text) {
  return { type: types.UPDATE_TEXT, data: text };
}

export function saveItemToList(item, list) {
  return (dispatch) => {
    firebaseDataStore
      .addItemToList(item, list)
      .then(() => firebaseDataStore.getList(list.userId, list.id))
      .then(l => dispatch({ type: types.LIST_UPDATED, data: l }));
  };
}

export function removeItemFromList(item, owner) {
  return (dispatch) => {
    if (item.isActive === true) {
      firebaseDataStore
        .updateItem(Object.assign({}, item, { isActive: false, lastModified: Date.now() }))
        .then(() => firebaseDataStore.getList(owner))
        .then(list => dispatch({ type: types.LIST_UPDATED, data: list }));
    } else {
      firebaseDataStore.removeItem(item).then(() => dispatch({ type: types.LIST_ITEM_CHANGED }));
    }
  };
}

export function clearList(list) {
  return (dispatch) => {
    firebaseDataStore
      .removeAllListItems(list)
      .then(() => dispatch({ type: types.LIST_ITEM_CHANGED }));
  };
}
