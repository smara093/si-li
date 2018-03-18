/* eslint import/prefer-default-export: 0 */
import Expo from 'expo';
import firebase from 'firebase';
import types from '../constants/actionTypes';
import * as dataStore from '../core/persistence/firebase';
import User from '../core/models/User';
import * as configuration from '../config/configuration';

export function authenticateWithGoogle() {
  return async (dispatch) => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: configuration.androidClientId,
        androidStandaloneAppClientId: configuration.androidStandaloneAppClientId,
        scopes: ['profile', 'email'],
        behavior: 'system',
      });

      if (result.type === 'success') {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken,
        );

        const authenticatedUser = await firebase
          .auth()
          .signInWithCredential(googleCredential)
          .catch((err) => {
            console.log('error', err);
          });

        const user = new User(
          authenticatedUser.uid,
          authenticatedUser.email,
          authenticatedUser.displayName,
        );

        if ((await dataStore.userExists(user)) === false) {
          dataStore.addUser(user);
        }

        dispatch({
          type: types.LOGIN_USER_AUTHENTICATED,
          data: user,
        });

        const lists = await dataStore.getLists(user.id);

        dispatch({ type: types.LISTS_LOADED, data: lists });
      }

      // throw exception
      return { cancelled: true };
    } catch (e) {
      // throw exception
      return { error: true };
    }
  };
}
