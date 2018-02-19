import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import myListsReducer from '../reducers/myListsReducer';
import loginReducer from '../reducers/loginReducer';
import activeListReducer from '../reducers/activeListReducer';

const rootReducer = combineReducers({
  activeList: activeListReducer,
  lists: myListsReducer,
  login: loginReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
