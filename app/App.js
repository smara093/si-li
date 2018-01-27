import React from 'react';
import Expo from 'expo';
import SimpleList from './SimpleList';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './storeConfig'

const App = () => (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SimpleList />
      </PersistGate>
    </Provider>
    );

Expo.registerRootComponent(App)