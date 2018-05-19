/* eslint import/prefer-default-export: "off" */

import firebase from 'firebase';

import types from '../constants/actionTypes';

export function signOut() {
  return async (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          types: types.ACCOUNT_USER_SIGNED_OUT,
        });
      });
  };
}
