/* eslint import/prefer-default-export: 0 */
import types from '../constants/actionTypes';
import * as dataStore from '../core/persistence/firebase';

export function dispatchUserAuthenticated(user) {
  return async (dispatch) => {
    dispatch({ type: types.LOGIN_USER_AUTHENTICATED, data: user });
    const lists = await dataStore.getLists(user.id);
    dispatch({ type: types.LISTS_LOADED, data: lists });
  };
}
