import { StackNavigator } from 'react-navigation';

import ActiveListScreen from '../screens/active-list';
import ListsScreen from '../screens/my-lists';
import screens from '../constants/screens';
import MyAccountScreen from '../screens/my-account';
import { colors } from '../components/styles/SimpleListStyles';

export const RootStack = StackNavigator(
  {
    ActiveList: {
      screen: ActiveListScreen,
    },
    Lists: {
      screen: ListsScreen,
    },
    MyAccount: {
      screen: MyAccountScreen,
    },
  },
  {
    initialRouteName: screens.Lists,
    navigationOptions: { headerTitleStyle: { color: colors.primary } },
  },
);

export default RootStack;
