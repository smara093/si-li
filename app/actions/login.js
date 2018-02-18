import types from '../constants/actionTypes';
import * as firebaseDataStore from '../core/persistence/firebase';

export function authenticate(userName) {
  return (dispatch) => {
    // go initialize the data for the authenticated user (async)
    // first, let the app know that data is loading (maybe show a spinner??)
    dispatch({ type: types.LOGIN_AUTHENTICATED, data: userName });

    return firebaseDataStore
      .getLists(userName)
      .then(response => response, error => console.log('error', error))
      .then(response => dispatch({ type: types.LISTS_LOADED, data: response }));
  };
}

export function updateUserName(text) {
  return { type: types.LOGIN_UPDATE_USERNAME, data: text };
}
