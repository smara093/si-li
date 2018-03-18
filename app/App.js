import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import store from './config/storeConfig';
import { FIREBASE_CONFIG } from './config/configuration';
import AppNavigator from './navigators/AppNavigator';

firebase.initializeApp(FIREBASE_CONFIG);

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

Expo.registerRootComponent(App);
