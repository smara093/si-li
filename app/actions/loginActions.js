import types from '../constants/actionTypes';
import * as dataStore from '../core/persistence/firebase';

export function authenticateUserWithEmailAndPassword(email, password) {
  return async (dispatch) => {
    const setError = (message) => {
      dispatch({ type: types.LOGIN_ERROR_OCURRED, data: message });
    };

    let authenticatedUser;
    try {
      authenticatedUser = await dataStore.signInWithEmailAndPassword(email, password);

      dispatch({
        type: types.LOGIN_USER_AUTHENTICATED,
        data: authenticatedUser,
      });
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          setError('Are you sure your password is correct?');
          break;
        default:
          setError('Something went wrong, please try again');
      }
      return false;
    }

    try {
      const lists = await dataStore.getLists(authenticatedUser.id);
      dispatch({ type: types.LISTS_LOADED, data: lists });
    } catch (err) {
      console.log('An error has ocurred while loading lists');
    }

    return true;
  };
}

export function userHasRegistered(userInfo) {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER_REGISTERED', data: userInfo });
    dataStore.addUser({ id: userInfo.uid, email: userInfo.email });
  };
}

export function updateUserName(text) {
  return { type: types.LOGIN_UPDATED_USERNAME, data: text };
}
