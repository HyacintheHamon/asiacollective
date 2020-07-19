import React, {Component} from 'react';
import {Platform,
	StyleSheet,
	Text,
	View,
	Image,
	StatusBar,
	TextInput,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import firebase from '@react-native-firebase/app';
import {  Icon } from 'react-native-elements';
import {
	HeaderComponent,
	NotificationItem
} from '../components';
import Colors from "../constants/Colors";
import NavigationService from '../navigation/NavigationService';
const WebViewAndroid = require('react-native-webview-rtc');
import { inject, observer } from 'mobx-react/native';

const STATUS = {
	BUSY: "busy",
	AVAILABLE: "available",
	DO_NOT_DISTURB: "do_not_disturb",
}

@inject('userStore')
@observer
export default class WebViewScreen extends Component {
	
	handleOnMessage(event){
		var receivedEvent = "";
		
		if(event.message){ // handle current android
			receivedEvent = event.message;
		}
		else if(event.nativeEvent.data){ // handle latest webrtc
			receivedEvent = event.nativeEvent.data;
		}
		
		// redirect if equal
		if(receivedEvent == "viewCloseEvent"){
			this.props.userStore.setAvailabilityStatus(STATUS.AVAILABLE);
			this.props.navigation.goBack();
		}
	}

  render() {
	 const {url, title} = this.props.navigation.state.params;
    return (
	  <HeaderComponent
		  title={title}
		  headerContainerStyle={{}}
		  containerStyle={{ backgroundColor: Colors.statusBarColor }}
		  leftButtonImage={false}
		  leftIconName={'chevron-left'}
		  leftIconType={'evilicon'}
		  rightButtonImage={false}
		  rightIconName={null}
		  leftButtonOnPress={()=>{ this.props.navigation.goBack() }}
		  rightIconType={'ionicon'}
		  enableRightIcon={false}
		  enableLeftIcon={'true'}>
			<StatusBar barStyle="light-content" backgroundColor={Colors.statusBarColor}/>
		  	
			{Platform.OS == 'ios' ? <WebView
			source={{ uri: url }}
			javaScriptEnabled={true}
			useWebKit={true}
			/>: <WebViewAndroid
				javaScriptEnabled={true}
				javaScriptEnabledAndroid={true}
				geolocationEnabled={false}
				builtInZoomControls={false}
				mediaPlayUserGesture={false}
				
				onShouldStartLoadWithRequest={null}
				onNavigationStateChange={null}
				onMessage={(event)=>{
					this.handleOnMessage(event);
				}}
				url={url}
				style={{flex:1}}
			  />}
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
});
