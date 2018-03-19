import { StackNavigator } from 'react-navigation';

import ActiveListScreen from '../screens/active-list';
import ListsScreen from '../screens/my-lists';
import screens from '../constants/screens';

export const RootStack = StackNavigator(
  {
    ActiveList: {
      screen: ActiveListScreen,
    },
    Lists: {
      screen: ListsScreen,
    },
  },
  {
    initialRouteName: screens.Lists,
  },
);

export default RootStack;
