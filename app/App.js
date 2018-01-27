import React from 'react';
import Expo from 'expo';
import SimpleList from './SimpleList';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './listReducer'

const store = createStore(reducer)

const App = () => (
    <Provider store={store}>
      <SimpleList />
    </Provider>
    );

Expo.registerRootComponent(App)