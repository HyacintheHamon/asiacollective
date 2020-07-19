import {
  createStackNavigator,
  createDrawerNavigator,
  StackNavigator
} from 'react-navigation';
import DrawerContent from './DrawerContent';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WebViewScreen from '../screens/WebViewScreen';
import ListsScreen from '../screens/ListsScreen';
import CallScreen from '../screens/CallScreen';
import ChangeAvailabilityScreen from '../screens/ChangeAvailabilityScreen';

const StackNavigatorOptions = {
  header: null,
  headerMode: 'none',
  animationEnabled: false
};
 

const DrawerNavigation = createDrawerNavigator(
  {
		HomeScreen: { screen: HomeScreen },
		SettingsScreen: { screen: SettingsScreen },
		WebViewScreen: { screen: WebViewScreen },
		ListsScreen: { screen: ListsScreen },
		ChangeAvailabilityScreen: { screen: ChangeAvailabilityScreen },
  },
  {
    contentComponent: DrawerContent,
    animationEnabled: false
  }
);

const stackNavigator = createStackNavigator(
  {
		SplashScreen: SplashScreen,
    Home: DrawerNavigation,
    LoginScreen: LoginScreen,
		ForgotPasswordScreen: ForgotPasswordScreen,
		SignupScreen: SignupScreen,
		CallScreen: CallScreen,

  },
  {
    initialRouteName: 'SplashScreen',
    navigationOptions: {
      header: null
    }
  }
);

export default stackNavigator;
