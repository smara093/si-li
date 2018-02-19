import types from '../constants/actionTypes';
import * as firebaseDataStore from '../core/persistence/firebase';

export function authenticate(userName) {
  return (dispatch) => {
    // go initialize the data for the authenticated user (async)
    // first, let the app know that data is loading (maybe show a spinner??)
    dispatch({ type: types.LOGIN_AUTHENTICATED, data: userName });

    return firebaseDataStore
      .getLists(userName)
      .then(
        response => dispatch({ type: types.LISTS_LOADED, data: response }),
        error => console.log('error', error),
      );
  };
}

export function updateUserName(text) {
  return { type: types.LOGIN_USERNAME_UPDATED, data: text };
}
