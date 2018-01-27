import React from 'react';
import Expo from 'expo';
import SimpleList from './SimpleList';

export default class App extends React.Component {
   render() {
    return (
      <SimpleList></SimpleList>
    );
  }
}

Expo.registerRootComponent(App)