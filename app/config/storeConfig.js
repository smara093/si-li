import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import listsReducer from '../reducers/listsReducer';
import loginReducer from '../reducers/loginReducer';
import activeListReducer from '../reducers/activeListReducer';

const rootReducer = combineReducers({
  activeList: activeListReducer,
  lists: listsReducer,
  login: loginReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
