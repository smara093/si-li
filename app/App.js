import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import { store } from './config/storeConfig';
import ActiveListScreen from './screens/active-list';
import ListsScreen from './screens/lists';
import LoginScreen from './screens/login';
import config from './core/persistence/firebase-config';

firebase.initializeApp(config);

const RootStack = StackNavigator(
  {
    ActiveList: {
      screen: ActiveListScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Lists: {
      screen: ListsScreen,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const App = () => (
  <Provider store={store}>
    <RootStack />
  </Provider>
);

Expo.registerRootComponent(App);
