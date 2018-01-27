import React from 'react';
import Expo from 'expo';
import SimpleList from './SimpleList';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './listRedux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/lib/integration/react'

const persistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)

const App = () => (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SimpleList />
      </PersistGate>
    </Provider>
    );

Expo.registerRootComponent(App)