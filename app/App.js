import React from 'react';
import Expo from 'expo';
import SimpleList from './SimpleList';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {}
const reducer = (state = initialState, action) => {
  console.log(`I am responding to an action of type ${action.type}! yay`)

  return state
}

const store = createStore(reducer)

const App = () => (
    <Provider store={store}>
      <SimpleList />
    </Provider>
    );

Expo.registerRootComponent(App)