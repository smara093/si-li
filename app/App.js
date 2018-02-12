import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { StackNavigator } from 'react-navigation';

import { store, persistor } from './config/storeConfig';
import ActiveList from './screens/active-list';

const RootStack = StackNavigator({
  ActiveList: {
    screen: ActiveList,
  },
});

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RootStack />
    </PersistGate>
  </Provider>
);

Expo.registerRootComponent(App);
