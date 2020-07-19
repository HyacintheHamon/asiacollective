// import { AppState, AsyncStorage } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import type { RemoteMessage, NotificationOpen } from "react-native-firebase";
const firebase = require('react-native-firebase');
import CallService from './callService.js';
import {API_URL} from './app.json';


export default async (message: RemoteMessage) => {
	
		if(message.data.type == 'CALL'){
			if(message.data.createdAt){
				let fiveMinutes = 5*60*1000;
				let currentTimestamp = new Date().getTime();
				if( (currentTimestamp - Number(message.data.createdAt)) > fiveMinutes ){
					const notification = new firebase.notifications.Notification();
								notification.android.setPriority(firebase.notifications.Android.Priority.High);
								notification.android.setChannelId("test-channel");
								notification.setTitle("Missed call");
								notification.setBody(`You've missed a call from ${message.data.sender}`);
					
					firebase.notifications().displayNotification(notification);
					// break here return message notification instead;
					return Promise.resolve(message);
				}
			}
			
			AsyncStorage.setItem('pendingCall', JSON.stringify(message.data)).then(function(){
				CallService.setAvailable(true);
				CallService.displayIncomingCall(message.data)
			});
		}
		
		else {
			var _notifications = [];
			_notifications.push({ title:message.data.title, body: message.data.body, data:message.data, timestamp: new Date().getTime() });
			AsyncStorage.getItem('_notifications', (error, cachedItem)=>{
				if(error || !cachedItem){
					AsyncStorage.setItem('_notifications', JSON.stringify(_notifications));
				}
				else {
					var result = JSON.parse(cachedItem);
					AsyncStorage.setItem('_notifications', JSON.stringify(result.concat(_notifications)));
				}
			});
			
			const notification = new firebase.notifications.Notification();
						notification.android.setPriority(firebase.notifications.Android.Priority.High);
						notification.android.setChannelId("test-channel");
						notification.setTitle(message.data.title);
						notification.setBody(message.data.body);
			
			firebase.notifications().displayNotification(notification);
		}
		
		return Promise.resolve(message);
};
