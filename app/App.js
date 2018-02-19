import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import store from './config/storeConfig';
import config from './core/persistence/firebase-config';
import AppNavigator from './navigators/AppNavigator';

firebase.initializeApp(config);

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

Expo.registerRootComponent(App);
