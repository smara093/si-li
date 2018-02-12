import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import simpleListReducer from '../reducers/simpleListReducer';

const persistConfig = {
  key: 'root',
  storage,
};

// const rootReducer = combineReducers(simpleListReducer);

// const persistedReducer = persistReducer(persistConfig, simpleListReducer);
export const store = createStore(simpleListReducer, applyMiddleware(thunkMiddleware));
// export const persistor = persistStore(store);
