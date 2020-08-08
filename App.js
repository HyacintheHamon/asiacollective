import React from "react";
import { AppRegistry, View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, StatusBar, RefreshControl, Platform } from "react-native";
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import { Provider } from 'mobx-react';
import stores from './stores';
import LoginScreen from './src/screens/LoginScreen';
import LoginEmailScreen from './src/screens/LoginEmailScreen';
import SignUpScreen from './src/screens/SignupScreen';
import AccountScreen from './src/screens/AccountScreen';
import AccountTermScreen from './src/screens/AccountTermScreen';
import AccountHelpScreen from './src/screens/AccountHelpScreen';
import AccountChangePasswordScreen from './src/screens/AccountChangePasswordScreen';
import AccountAddCodeScreen from './src/screens/AccountAddCode';
import ScanScreen from './src/screens/ScanScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import DiscoverScreen from './src/screens/Discover/DiscoverScreen';
import DiscoverPreviewScreen from './src/screens/Discover/DiscoverPreviewScreen';
import DiscoveryListScreen from './src/screens/Discover/DiscoveryList';
import DealPreviewScreen from './src/screens/Deals/DealPreviewScreen';
import DealScreen from './src/screens/Deals/DealScreen';
import DealListAllVenuesScreen from './src/screens/Deals/DealListAllVenues';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { NavigationActions } from 'react-navigation';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import changeNavigationBarColor, {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';
import { inject, observer } from 'mobx-react/native'
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

const user = firebase.auth().currentUser;
var {width,height} = Dimensions.get('window');
console.disableYellowBox = true;

const AccountNavigation = createStackNavigator({
	Login: {
		screen: LoginScreen,
		navigationOptions: { header: null }
	},
	LoginEmail: {
		screen: LoginEmailScreen,
		navigationOptions: { header: null }
	},
	SignUp: {
		screen: SignUpScreen,
		navigationOptions: { header: null }
	},
	Account: {
		screen: AccountScreen,
		navigationOptions: { header: null }
	},
	AccountTerm: {
		screen: AccountTermScreen,
		navigationOptions: { header: null }
	},
	AccountHelp: {
		screen: AccountHelpScreen,
		navigationOptions: { header: null }
	},
	AccountChangePassword: {
		screen: AccountChangePasswordScreen,
		navigationOptions: { header: null }
	},
	AccountAddCode: {
		screen: AccountAddCodeScreen,
		navigationOptions: { header: null }
	},
	initialRouteName: 'Login',
});

const DiscoverNavigation = createStackNavigator({
	Discover: {
		screen: DiscoverScreen,
		navigationOptions: { header: null }
	},
	DiscoverPreview: {
		screen: DiscoverPreviewScreen,
		navigationOptions: { header: null }
	},
	DiscoveryList: {
		screen: DiscoveryListScreen,
		navigationOptions: { header: null }
	},
	initialRouteName: 'Discover',
});

const DealNavigation = createStackNavigator({
	Deal: {
		screen: DealScreen,
		navigationOptions: { header: null }
	},
	initialRouteName: 'Deal',
});

var HomeNavigation = createBottomTabNavigator({
  Venues: DiscoverNavigation,
	Shop: DealNavigation,
  Account: AccountNavigation,
},  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Venues') {
          iconName = `home`;
					return <SimpleLineIcons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        } else if (routeName === 'Shop') {
          iconName = `present`;
					return <SimpleLineIcons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        }
				else if(routeName === 'Account'){
					iconName = `user`;
					return <Feather name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
				}
				return null
      },
    }),
    tabBarOptions: {
      activeTintColor: '#D3BB8E',
      inactiveTintColor: '#A1A1A1',
    },
});

const RootStack = createStackNavigator({
	Welcome:{
		screen: WelcomeScreen,
		navigationOptions: { header: null }
	},
	Home: {
		screen: HomeNavigation,
		navigationOptions: { header: null }
	},
	Preview: {
		screen: PreviewScreen,
		navigationOptions: { header: null }
	},
	ScanScreen: {
		screen: ScanScreen,
		navigationOptions: { header: null }
	},
	DealPreview: {
		screen: DealPreviewScreen,
		navigationOptions: { header: null }
	},
	DealListAllVenues: {
		screen: DealListAllVenuesScreen,
		navigationOptions: { header: null }
	},
	initialRouteName: 'Welcome',
});

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

class StarterApp extends React.Component {
	componentDidMount(){
		if(Platform.OS === 'android'){
               changeNavigationBarColor('#231F20', false);
		}
	}
  render() {
    return (
			<Provider {...stores}>
    		<RootStack />
			</Provider>
    );
  }
}

AppRegistry.registerComponent("AsiaCollective", () => StarterApp);

export default StarterApp;
