import PropTypes from 'prop-types';
import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

import ActiveListScreen from '../screens/active-list';
import ListsScreen from '../screens/lists';
import LoginScreen from '../screens/login';
import screens from '../constants/screens';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation,
);
const addListener = createReduxBoundAddListener('root');

export { navigationMiddleware };

export const RootStack = StackNavigator(
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
    initialRouteName: screens.Login,
  },
);

class Navigator extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, navigation } = this.props;
    return (
      <RootStack
        navigation={addNavigationHelpers({
          dispatch,
          state: navigation,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
});

export const AppWithNavigationState = connect(mapStateToProps)(Navigator);
