import types from '../constants/actionTypes';
import * as firebaseDataStore from '../core/persistence/firebase';

export function userHasAuthenticated(userInfo) {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_USER_AUTHENTICATED', data: userInfo });

    try {
      const lists = await firebaseDataStore.getLists(userInfo.uid);

      dispatch({ type: types.LISTS_LOADED, data: lists });
    } catch (err) {
      console.log('An error has ocurred while loading lists');
    }
  };
}

export function userHasRegistered(userInfo) {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER_REGISTERED', data: userInfo });
    firebaseDataStore.addUser({ id: userInfo.uid, email: userInfo.email });
  };
}

export function updateUserName(text) {
  return { type: types.LOGIN_UPDATED_USERNAME, data: text };
}
