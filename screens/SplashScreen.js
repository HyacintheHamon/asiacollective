import React, {Component} from 'react';
import {Platform,
	StyleSheet,
	Text,
	View,
	Image,
	StatusBar,
	TextInput,
	TouchableOpacity,
	Linking,
	ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import { Icon } from 'react-native-elements';
import {
	HeaderComponent,
	NotificationItem
} from '../components';
import Colors from "../constants/Colors";
import NavigationService from '../navigation/NavigationService';
import { inject, observer } from 'mobx-react/native';
const reactnavigation = require('react-navigation');

@inject('userStore')
@observer
export default class SplashScreen extends Component {


	constructor(props) {
		super(props);
	}


	handleUserNotFound(){
		this.props.navigation.replace('LoginScreen');
		const UserStore = this.props.userStore;
		UserStore.logoutUser();
	}
	
	componentWillUnmount() {
	  Linking.removeEventListener('url', this.handleOpenURL);
	}
	
	handleOpenURL(url) {
		var DOMAIN_NAME = "pager";
		var obj = {};
		var u = url.split(DOMAIN_NAME+"?");
		u = u[u.length-1];
		
		// Extract the query parameters normally from deeplink & assign it into key value object
		obj = u.split("&").reduce(function(prev, curr, i, arr) {
				var p = curr.split("=");
				prev[p[0]] = decodeURIComponent(p[1]);
				return prev;
		}, {});
		
		// If deeplink url contains urlToOpen query parameter it will extract all subsequent parameters from the start of urlToOpen
		if(u.indexOf('urlToOpen=') != -1){
			obj["urlToOpen"] = u.split('urlToOpen=')[1];
		}
		console.log('@@@@@@@@@@@ passed me go to app', obj);
		
		NavigationService.replace('Home', obj);
	}

	componentDidMount(){
		Linking.getInitialURL().then((url) => {
			console.log('---url', url)
				if (url) {
					console.log('Initial url is: ' + url);
					this.handleOpenURL(url)
				}
				else {
					// if no url
					
					
					const UserStore = this.props.userStore;
					
					UserStore.isSignedIn((isSignedIn)=>{
						UserStore.onAuthStateChangedRef(); //unsubscribe
						if(!isSignedIn){
							this.handleUserNotFound();
							return;
						}
						console.log('@@@@@@@@ passed me go to home');
						console.log(NavigationService);
						console.log(this.props.navigation);
						console.log(reactnavigation);
						// problem is here
				
						NavigationService.replace('Home');
						//this.props.navigation.replace('Home');
						console.log(this.props.navigation);
					});
					
					
				}
				
				
				
				
		  }).catch(err => console.error('An error occurred', err));
			Linking.addListener('url', this.handleOpenURL);
			
			
		
	}

	render() {
		return (
			<HeaderComponent
			 title={''}
			 enableLeftIcon={false}
			 enableRightIcon={false}>

			 </HeaderComponent>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'green',
	},
});
