import React, {Component} from 'react';
import {Platform,
	StyleSheet,
	Text,
	View,
	Modal,
	Image,
	StatusBar,
	PermissionsAndroid,
	TouchableOpacity,
	Vibration,
	AppState,
	ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import { Icon } from 'react-native-elements';
import {
	HeaderComponent,
	NotificationItem,
	ModalCallScreen
} from '../components';
import Colors from "../constants/Colors";
import NavigationService from '../navigation/NavigationService';
import { inject, observer } from 'mobx-react/native';
import Toast, {DURATION} from 'react-native-easy-toast';
import CallService from '../callService.js';
const axios = require('axios');

const STATUS = {
	BUSY: "busy",
	AVAILABLE: "available",
	DO_NOT_DISTURB: "do_not_disturb",
}

@inject('userStore')
@observer
export default class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isSoundMuted: false,
			appState: AppState.currentState,
			isRinging: false,
			incommingCall: {},
			notifications:[],
		};
	}
	
	setModalVisible(visible) {
    this.setState({isRinging: visible});
		
		this.props.userStore.setAvailabilityStatus(STATUS.BUSY);
		
		if(visible){
			const PATTERN = [200, 200, 200, 200];
			Vibration.vibrate(PATTERN,true);
		}
		else {
			
			Vibration.cancel();
		}
  }

	async checkPermissionCamera() {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,{
					title: 'OrionPager Camera Permission',
					message:'OrionPager needs your permission for your camera to utilize conference feature.'
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				return true;
			} else {
				Alert.alert('Permission Error', 'Permission denied. Please try again');
				return false;
			}
		} catch (err) {
			console.warn(err);
			return false;
		}
	}

	async checkPermissionMicrophone() {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,{
					title: 'OrionPager AUDIO Permission',
					message: 'OrionPager needs your permission for your microphone to utilize conference feature.'
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				return true;
			} else {
				Alert.alert('Permission Error', 'Permission denied. Please try again');
				return false;
			}
		} catch (err) {
			console.warn(err);
			return false;
		}
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
		
		if(this.notificationDisplayedListener){
			this.notificationDisplayedListener();
		}
		if(this.notificationListener){
			this.notificationListener();
		}
	}

	_handleAppStateChange = (nextAppState) => {
		if ( this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			console.log('App has come to the foreground!');
			this.checkHasPendingCall();
		}
		this.fetchLocalStorage();
		this.setState({appState: nextAppState});
	};

	async componentDidMount() {
		
		AppState.addEventListener('change', this._handleAppStateChange);
		if (Platform.OS == 'android') {
			const permission = await this.checkPermissionCamera();
			if (!permission) {
				return;
			}

			const permission2 = await this.checkPermissionMicrophone();
			if (!permission2) {
				return;
			}
		}
		
		 
		// TODO: You: Do firebase things
		//const { user } = await firebase.auth().signInAnonymously();
		// console.wa3rn('User -> ', user.toJSON());
		this.notifications();
		
		const fcmToken = await firebase.messaging().getToken();
		const UserStore = this.props.userStore;
		if(fcmToken){
			UserStore.addDeviceFCMToken(fcmToken, function(response){
				console.log(response);
			});
		}

		// Build a channel
		const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
		.setVibrationPattern([200, 200, 200, 200])
		.setDescription('My apps test channel');

		// Create the channel
		firebase.notifications().android.createChannel(channel);


		// listen to notification clicks
		firebase.notifications().onNotificationOpened((notificationOpen) => {
			// notificationOpen.action will equal 'yes'
			if(notificationOpen.notification.data && notificationOpen.notification.data.urlToOpen){
				if(notificationOpen.action == 'yes'){
					NavigationService.navigate('WebViewScreen', {title:notificationOpen.notification.title, url: notificationOpen.notification.data.urlToOpen});
				}

			}
		});
		
		this.fetchLocalStorage();
		this.checkHasPendingCall();
	}
	
	checkHasPendingCall(){
		console.log('should have passed me');
		AsyncStorage.getItem('pendingCall', (error, cachedItem)=>{
			if(error || !cachedItem || cachedItem.length == 0){
				
			}
			else {
				var result = JSON.parse(cachedItem);
				this.setState({ incommingCall: Object.assign({}, {data:result}) }, ()=>{
					this.setModalVisible(true);
					AsyncStorage.setItem('pendingCall', "");
				});
				
			}
		});
	}
	
	fetchLocalStorage(){
		AsyncStorage.getItem('_notifications', (error, cachedItem)=>{
			if(!error){
				if(cachedItem){
					var result = JSON.parse(cachedItem);
					this.setState({ notifications: result})
				}
			}
		});
	}
 
	triggerNotificationManuallyWithParams(title,body,data){
		var notification = new firebase.notifications.Notification()
		.setNotificationId('notificationId')
		.setTitle(title)
		.setBody(body)
		.setData(data);
		notification.android.setChannelId('test-channel')
		notification.android.setPriority(firebase.notifications.Android.Priority.Max)
		notification.android.setVibrate([200, 200, 200, 200]);
		notification.android.setSmallIcon('ic_launcher');

		if(data["json-data"]){
			const payloadActions = JSON.parse(data["json-data"]);
			// Build an action
			if(payloadActions.actions && payloadActions.actions.length != 0){
				payloadActions.actions.forEach(function(currentVal,index){
					const action = new firebase.notifications.Android.Action(currentVal.action, 'ic_launcher', currentVal.title);

					// Add the action to the notification
					notification.android.addAction(action);
				});
			}
			// for targetted notification that has different strcture
			if(payloadActions && payloadActions.length != 0){
				payloadActions.forEach(function(currentVal,index){
					const action = new firebase.notifications.Android.Action(currentVal.action, 'ic_launcher', currentVal.title);

					// Add the action to the notification
					notification.android.addAction(action);
				});
			}

		}




		firebase.notifications().displayNotification(notification)
	}

	startListening(){
		console.log('starting listeners');

		this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
			// Process your message as required
			if(message.data.type == 'CALL'){
				if(message.data.createdAt){
					let fiveMinutes = 5*60*1000;
					let currentTimestamp = new Date().getTime();
					if( (currentTimestamp - Number(message.data.createdAt)) > fiveMinutes ){
						this.triggerNotificationManuallyWithParams("Missed call", `You've missed a call from ${message.data.sender}`, message.data);
						return;
					}
				}
				
				this.setState({ incommingCall:message },()=>{
					this.setModalVisible(true);
				});
				return;
			}

			//console.log(message);
			var _notifications = [];
			if(this.state.notifications){
				_notifications = this.state.notifications;
			}
			_notifications.push({ title:message.data.title, body: message.data.body, data:message.data, timestamp: new Date().getTime() });

			AsyncStorage.getItem('_notifications', (error, cachedItem)=>{
				if(!error || !cachedItem){
					AsyncStorage.setItem('_notifications', JSON.stringify(_notifications));
				}
				else {
					var result = JSON.parse(cachedItem);
					AsyncStorage.setItem('_notifications', JSON.stringify(result.concat(_notifications)));
				}
			});
			 this.setState({notifications: _notifications});
			 this.triggerNotificationManuallyWithParams(message.data.title, message.data.body, message.data)
		
		//	console.log('message', message);
		});

		// called from local notification
		this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
			// Process your notification as required
			// ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
			console.log('receive',notification)
			//this.setState({ notification: JSON.stringify(Notification)})
		});

		// called from remote messaging
		this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
			// Process your notification as required

			var _notifications = [];
			if(this.state.notifications){
				_notifications = this.state.notifications;
			}
			_notifications.push({ title:notification.title, body: notification.body, data:notification.data, timestamp: new Date().getTime() });

			AsyncStorage.getItem('_notifications', (error, cachedItem)=>{
				if(!error || !cachedItem){
					AsyncStorage.setItem('_notifications', JSON.stringify(_notifications));
				}
				else {
					var result = JSON.parse(cachedItem);
					AsyncStorage.setItem('_notifications', JSON.stringify(result.concat(_notifications)));
				}
			});
			this.setState({notifications: _notifications});
			this.triggerNotificationManuallyWithParams(notification.title,notification.body,notification.data)
			if(this.state.appState == "active"){
				const PATTERN = [200, 200, 200, 200];
				Vibration.vibrate(PATTERN);
			}
			//this.setState({ notification2: JSON.stringify(Notification)})
		});
	}

	notifications(){
		console.log('starting notifications');
		firebase.messaging().hasPermission().then(enabled => {
			console.log('isenabled'+enabled);
			if (enabled) {
				// user has permissions
				this.startListening();
			} else {
				// user doesn't have permission
				firebase.messaging().requestPermission().then(() => {
					// User has authorised
					this.startListening();
				})
				.catch(error => {
					// User has rejected permissions
				});
			}
		});

	}
	
	handleDelete(index){
		var _notifications = this.state.notifications.sort((a,b) => b.timestamp - a.timestamp);
		_notifications.splice(index, 1);
		AsyncStorage.setItem('_notifications', JSON.stringify(_notifications));
		 this.setState({notifications: _notifications});
	}
	
	handleOnDropCall(){
		this.setModalVisible(false);
		this.props.userStore.setAvailabilityStatus(STATUS.AVAILABLE);
	}

	render() {
		const { isSoundMuted, incommingCall } = this.state;
		
		return (
			<HeaderComponent
			title={'Notification'}
			headerContainerStyle={{}}
			containerStyle={{}}
			leftButtonImage={false}
			leftIconName={'md-menu'}
			leftIconType={'ionicon'}
			rightButtonImage={false}
			rightIconName={isSoundMuted?'ios-volume-off':'ios-volume-high'}
			rightIconType={'ionicon'}
			leftButtonOnPress={()=>{ this.props.navigation.toggleDrawer() }}
			rightButtonOnPress={()=>{ this.setState({ isSoundMuted: !this.state.isSoundMuted }) }}
			enableRightIcon={true}
			enableLeftIcon={'true'}>

			<StatusBar barStyle="light-content" backgroundColor={Colors.statusBarColor}/>
			<View style={{alignItems:'center', justifyContent:'center', marginTop:10}}>
				<TouchableOpacity>
					<View style={{width:250, height:34, position:'relative', alignItems:'center', justifyContent:'center' }}>
						<Image
						source={require('../assets/images/notification_box.png')}
						style={{width:250, height:34, position:'absolute', left:0,right:0,bottom:0,top:0}}
						borderRadius={4}
						resizeMode={'stretch'}/>
						<Text style={{color:"#fff",  }}>You have {this.state.notifications.length} new notifications</Text>
					</View>
				</TouchableOpacity>
			</View>


				<ScrollView
					contentContainerStyle={{paddingBottom:36}}
					nestedScrollEnabled={true}
					showsVerticalScrollIndicator={false}
					automaticallyAdjustContentInsets={false}>
					{this.state.notifications.sort((a,b) => b.timestamp - a.timestamp).map((currentVal,index)=>{
						return (<NotificationItem
							key={`notif-${index}`}
							data={{title:currentVal.title +" : "+currentVal.body, isActive: true, heartbeat: currentVal.timestamp, extraData:currentVal.data}}
							onPress={()=>{
								if(currentVal.data && currentVal.data.urlToOpen){
									NavigationService.navigate('WebViewScreen',  {title:currentVal.title, url: currentVal.data.urlToOpen})
								}
							}}
							onDelete={()=>{
								this.handleDelete(index);
							}}
							/>)
					})}
				</ScrollView>
				
				<ModalCallScreen
					visible={this.state.isRinging}
					data={incommingCall && incommingCall.data ? incommingCall.data : null}
					onDropCall={()=>{ this.handleOnDropCall() }}
					onAcceptCall={()=>{
						const { urlToOpen, sender } = this.state.incommingCall.data;
						this.setModalVisible(false);
						NavigationService.navigate('WebViewScreen', {title:sender, url: urlToOpen});
					}}/>
					
					<Toast ref="toast"/>

				</HeaderComponent>
			);
		}
	}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#F5FCFF',
			paddingTop:24,
		},
	});
