import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import listsReducer from '../reducers/listsReducer';
import loginReducer from '../reducers/loginReducer';
import activeListReducer from '../reducers/activeListReducer';
import navigationReducer from '../reducers/navigationReducer';
import { navigationMiddleware } from '../navigators/AppNavigator';

const rootReducer = combineReducers({
  activeList: activeListReducer,
  lists: listsReducer,
  login: loginReducer,
  navigation: navigationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, navigationMiddleware));

export default store;
