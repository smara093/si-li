import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import store from './config/storeConfig';
import config from './core/persistence/firebase-config';
import { AppWithNavigationState } from './navigators/AppNavigator';

firebase.initializeApp(config);
firebase.database.enableLogging(true);

const App = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

Expo.registerRootComponent(App);
