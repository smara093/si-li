import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import store from './app/config/storeConfig';
import { FIREBASE_CONFIG } from './app/config/configuration';
import AppLoadingScreen from './app/screens/app-loading';

firebase.initializeApp(FIREBASE_CONFIG);

export default App = () => (
  <Provider store={store}>
    <AppLoadingScreen />
  </Provider>
);
