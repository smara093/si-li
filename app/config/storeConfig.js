import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore } from 'redux';

import simpleListReducer from '../reducers/simpleListReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, simpleListReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
