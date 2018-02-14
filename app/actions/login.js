/* eslint import/prefer-default-export: "off", no-unused-vars: "off" */

import types from '../constants/actionTypes';

// import * as firebaseDataStore from '../core/persistence/firebase';

export function authenticate(user) {
  return (dispatch) => {
    console.log(user);
    // something authenticate the user and do what needs to be done
  };
}

export function updateUserName(text) {
  console.log(`updating ${text}`);
  return { type: types.LOGIN_UPDATE_USERNAME, data: text };
}
