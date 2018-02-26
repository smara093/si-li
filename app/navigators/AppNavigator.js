import { StackNavigator } from 'react-navigation';

import ActiveListScreen from '../screens/active-list';
import ListsScreen from '../screens/my-lists';
import LoginScreen from '../screens/login';
import Registration from '../components/Registration';
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
    Registration: {
      screen: Registration,
    },
  },
  {
    initialRouteName: screens.Login,
  },
);

export default RootStack;
