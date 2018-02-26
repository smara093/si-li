import { StackNavigator } from 'react-navigation';

import ActiveListScreen from '../screens/active-list';
import ListsScreen from '../screens/my-lists';
import LoginScreen from '../screens/login';
import screens from '../constants/screens';

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

export default RootStack;
