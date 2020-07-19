import React, {Component} from 'react';
import {Platform,
	StyleSheet,
	Text,
	StatusBar,
	TextInput,
	Dimensions,
	Image,
	ImageBackground,
	BackHandler,
	View,
	TouchableOpacity,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import { Icon } from 'react-native-elements';
import {
	HeaderComponent,
	NotificationItem,
	ModalCallScreen
} from '../components';
import Colors from "../constants/Colors";
import RNMinimizeApp from 'react-native-minimize';
import NavigationService from '../navigation/NavigationService';
import { inject, observer } from 'mobx-react/native'

@inject('userStore')
@observer
export default class CallScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			incommingCall: {}
		}
	}
	
	componentDidMount(){
		console.log(this.props);
		this.setState({ incommingCall: this.props.navigation.state.params });
	}
	
	componentWillReceiveProps(){
		console.log(this.props);
	}
	
	onDropCall(){
		//this.props.navigation('HomeScreen');
		//NavigationService.replace('Home');
		this.props.navigation.goBack();
		setTimeout(function(){
				RNMinimizeApp.minimizeApp();
		},300);
		// or youcan just undo everything and use home screen and modal
		// pass a property on componentwillreceiveprops
	}
	
	onAcceptCall(){
		NavigationService.navigate('WebViewScreen', {title: "CONFERENCE", url: this.state.incommingCall.urlToOpen});
	}
	
	render() {
		var data = this.state.incommingCall;
		const { width, height } = Dimensions.get('window');
		
		return (
			<ImageBackground source={require('../assets/images/bg.png')} style={{width:width, height: height}}>
					<View style={{marginTop: 22, position:'relative', width:width, height:height}}>
						<View style={{alignItems:'center', justifyContent:'center'}}>
						
							<Text style={{color:'#fff', marginTop:10, marginBottom:40}}>Incoming call</Text>
							<Text style={{color:'#fff', fontSize:40}}>PAGER</Text>
							<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:20}}>
								<Text style={{backgroundColor:'#fff', borderRadius:2, paddingHorizontal:5, height:14, color:Colors.bg,fontSize:9, marginRight:4}}>CONFERENCE</Text>
								<Text style={{color:'#fff', fontSize:20, fontWeight:'bold'}}>{data && data.callId ? data.callId.slice(0,13) : ""}</Text>
							</View>
							<Image source={require('../assets/images/logo_1024.png')} style={{height:180, width:180, borderRadius:90}}/>
							<Text style={{color:'#fff', fontSize:12, marginTop:20}}>{data && data.sender ? data.sender : "coding.malkio@gmail.com"}</Text>
							
							
						</View>
						<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', position:'absolute', bottom:120, left:0, right:0}}>
								<TouchableOpacity onPress={()=>{ this.onAcceptCall() }}>
									<View style={{marginRight:width/4.5, width:80,height:80, borderRadius:40, alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
										<Icon
											name={'call'}
											type={'material'}
											color={'green'}
											size={60}
										/>
									</View>
								</TouchableOpacity>
								
								<TouchableOpacity onPress={() => { this.onDropCall() }}>
								<View style={{marginLeft:width/4.5, width:80,height:80, borderRadius:40, alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
									<Icon
										name={'call-end'}
										type={'material'}
										color={'red'}
										size={60}
									/>
								</View>
								</TouchableOpacity>
						</View>
					</View>
			</ImageBackground>
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
