import React from 'react';
import { AppLoading, Asset } from 'expo';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActivityIndicator } from 'react-native';
import { PropTypes } from 'prop-types';

import User from '../core/models/User';
import LoginScreen from '../screens/login';
import AppNavigator from '../navigators/AppNavigator';
import * as actions from '../actions/appLoadingActions';
import { Promise } from 'core-js';

class AppLoadingScreen extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  state = {
    isReady: false,
    isAuthenticated: null,
  };

  async initAuth() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isAuthenticated: true });
        this.props.actions.dispatchUserAuthenticated(new User(user.uid, user.email, user.displayName));
      } else {
        this.setState({ isAuthenticated: false });
      }
    });
  }

  async initAppAsync() {
    return Promise.all([
      this.initAuth(),
      Asset.loadAsync([require('../assets/google-button-1x.png')]),
    ]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={() => {
            this.initAppAsync();
          }}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    if (this.state.isAuthenticated === true) {
      return <AppNavigator />;
    }

    if (this.state.isAuthenticated === false) {
      return <LoginScreen />;
    }

    return <ActivityIndicator size="small" color="#ef7de7" />;
  }
}

function mapStateToProps() {}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLoadingScreen);
