import React, {Component} from 'react';
import {Platform,
	StyleSheet,
	Text,
	View,
	Image,
	StatusBar,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import { Icon } from 'react-native-elements';
import {
	HeaderComponent,
	NotificationItem
} from '../components';
import Colors from "../constants/Colors";
import NavigationService from '../navigation/NavigationService';
import { inject, observer } from 'mobx-react/native'

@inject('userStore')
@observer
export default class ForgotPasswordScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			response: "",
		}
	}
	
	handleResetPassword(){
		if(this.state.email.length == 0){
			return;
		}
		
		this.props.userStore.resetPassword(this.state.email, (isSuccess)=>{
			this.setState({
				email:"",
				response: isSuccess ? "Success a reset link has been sent to your email address" : "Error something went wrong"
			});
		})
	}

	render() {
		const { email, response } = this.state;
		return (
			<HeaderComponent
			title={''}
			enableLeftIcon={false}
			enableRightIcon={false}>
				<StatusBar barStyle="light-content" backgroundColor={Colors.statusBarColor}/>
				<Text style={{color:Colors.grayPrimary, fontSize:16, textAlign:'center'}}>Forgot Password</Text>
				<ScrollView
				contentContainerStyle={{flexGrow: 1}}
				nestedScrollEnabled={true}
				showsVerticalScrollIndicator={false}
				automaticallyAdjustContentInsets={false}>
					<View style={{position:'relative', alignSelf:'center', height:44, marginTop:20, width:280, marginBottom:100}}>
						<Image source={require("../assets/images/textinput_bg.png")} style={{height:44, width:280}} resizeMode={'stretch'} />
						<TextInput
						style={{position:'absolute', left:0,right:0,bottom:0,top:0,height: 44,width:280, borderColor: 'transparent', backgroundColor:'transparent', textAlign:'center', color:'#fff'}}
						placeholder={'Email address'}
						placeholderTextColor={Colors.gray}
						autoCapitalize={'none'}
						autoCorrect={false}
						onChangeText={email => this.setState({ email })}
						value={email}
						/>
						<Text style={{color:'gray', fontSize:11, textAlign:'center'}}>{response}</Text>
					</View>



					<TouchableOpacity onPress={()=>{ this.handleResetPassword() }}>
						<View style={{height:45, width:100, position:'relative', alignSelf:'center', marginBottom:40}}>
							<Image source={require("../assets/images/button_border.png")} style={{height:45, width:100}} resizeMode={'stretch'} />
							<Text style={{color:Colors.white, position:'absolute', left:0,right:0, textAlign:'center', top:12, fontSize:16}}>Send</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={{marginTop:50}} onPress={()=>{ this.props.navigation.goBack() }}>
						<Text style={{color:Colors.white, textAlign:'center', fontSize:16}}>Back</Text>
					</TouchableOpacity>
				</ScrollView>
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
