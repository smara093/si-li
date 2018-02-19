import types from '../constants/actionTypes';
import { RootStack } from '../navigators/AppNavigator';
import screens from '../constants/screens';

const initialAction = RootStack.router.getActionForPathAndParams(screens.Login);

const initialState = RootStack.router.getStateForAction(
  initialAction,
  RootStack.router.getStateForAction(initialAction),
);

const navigationReducer = (state = initialState, action) => {
  const { type } = action;
  let nextState;
  switch (type) {
    case types.LISTS_SELECTED:
      nextState = RootStack.router.getStateForAction(
        RootStack.router.getActionForPathAndParams(screens.ActiveList),
        state,
      );
      break;
    default:
      nextState = RootStack.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
};

export default navigationReducer;
