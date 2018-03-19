import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import store from './config/storeConfig';
import { FIREBASE_CONFIG } from './config/configuration';
import AppLoadingScreen from './screens/app-loading';

firebase.initializeApp(FIREBASE_CONFIG);

const App = () => (
  <Provider store={store}>
    <AppLoadingScreen />
  </Provider>
);

Expo.registerRootComponent(App);
