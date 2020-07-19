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
import { Icon, Button } from 'react-native-elements';
import {
	HeaderComponent,
	NotificationItem,
	ErrorBar
} from '../components';
import Colors from "../constants/Colors";
import NavigationService from '../navigation/NavigationService';
import { inject, observer } from 'mobx-react/native'

//import { LoginButton, AccessToken,LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

GoogleSignin.configure({
	"webClientId":"959778813639-jo7d35l0v64sah9h48qsdou8nca2gb5o.apps.googleusercontent.com"
});

@inject('userStore')
@observer
export default class LoginScreen extends Component{

	constructor(props) {
		super(props);
		this.state = {
			errors: [],
			email: "",
			password: "",
			isProcessingGoogle: false,
			isProcessingFacebook: false,
		}
	}

	handleUserNotFound(){
		const UserStore = this.props.userStore;
		UserStore.logoutUser();
	}
	
	async signInOrRegisterGoogle() {
		this.setState({ isProcessingGoogle: true });
		await GoogleSignin.hasPlayServices();
		GoogleSignin.signIn().then((payload) => {
			this.props.userStore.socialLogin('google', payload, this.handleSignInResponse.bind(this));
		}).catch(function(){
			this.setState({ isProcessingGoogle: false });
		});
	}
    /*
	async signInOrRegisterFacebook() {
		this.setState({ isProcessingFacebook: true });
		const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
		if (result.isCancelled) {
			// handle this however suites the flow of your app
			console.log('User cancelled request');
			this.setState({ isProcessingFacebook: false });
			return;
		}

		const payload = await AccessToken.getCurrentAccessToken();
		if (!payload) {
			console.log('Something went wrong obtaining the users access token');
			return;
		}

		this.props.userStore.socialLogin('facebook', payload, this.handleSignInResponse.bind(this));
	}
	*/

	handleSignIn(){
		var errors = [];
		const {email,password} = this.state;
		if(email.length == 0 || password.length == 0){
			errors.push("Invalid email or password");
      this.setState({errors:errors});
			return;
		}
		
		const UserStore = this.props.userStore;
		UserStore.login(email,password, this.handleSignInResponse.bind(this));
	}
	
	handleSignInResponse(isSignedIn){
			var errors = [];
			this.setState({ isProcessingFacebook: false, isProcessingGoogle: false });
			if(!isSignedIn){
				errors.push("Failed to login");
	      this.setState({errors:errors});
				this.handleUserNotFound();
				return;
			}
		
			this.props.navigation.replace('Home');
	}

	render() {
		const {email,password, isProcessingGoogle, isProcessingFacebook} = this.state;
		return (
			<HeaderComponent
			title={''}
			enableLeftIcon={false}
			enableRightIcon={false}>
			
				<StatusBar barStyle="light-content" backgroundColor={Colors.statusBarColor}/>
				<View style={{alignItems:'center', justifyContent:'center', marginBottom:20,paddingBottom:20}}>
					<Image source={require("../assets/images/logo_1024.png")} style={{height:130, width:130, borderRadius:65}} />
				</View>
				
				<ScrollView
					nestedScrollEnabled={true}
					showsVerticalScrollIndicator={false}
					automaticallyAdjustContentInsets={false}>
					
					<View style={{position:'relative', alignSelf:'center', height:48, width:300, marginVertical:4, marginTop:10}}>
						<Image source={require("../assets/images/textinput_bg.png")} style={{height:48, maxWidth:300}} resizeMode={'stretch'} />
						<TextInput
							style={{position:'absolute', left:0,right:0,bottom:0,top:0,height: 48,fontSize:12, maxWidth:300, paddingLeft:30, borderColor: 'transparent', color:'#fff',backgroundColor:'transparent', textAlign:'left'}}
							placeholder={'EMAIL ADDRESS'}
							placeholderTextColor={"#bec8d4"}
							autoCapitalize={'none'}
            			autoCorrect={false}
							onChangeText={email => this.setState({ email })}
							value={email}
						/>
					</View>
					
					
					<View style={{position:'relative', alignSelf:'center', height:48, maxWidth:300, marginVertical:4, marginBottom:20}}>
						<Image source={require("../assets/images/textinput_bg.png")} style={{height:48, maxWidth:300}} resizeMode={'stretch'} />
						<TextInput
							style={{position:'absolute', left:0,right:0,bottom:0,top:0,height: 48,fontSize:12, maxWidth:300, paddingLeft:30, borderColor: 'transparent', color:'#fff',backgroundColor:'transparent', textAlign:'left'}}
							placeholder={'PASSWORD'}
							secureTextEntry={true}
							placeholderTextColor={"#bec8d4"}
							autoCapitalize={'none'}
            			autoCorrect={false}
							onChangeText={password => this.setState({ password })}
							value={password}
							/>
					</View>
					<ErrorBar errors={this.state.errors}/>
					
					<TouchableOpacity onPress={()=>{ this.handleSignIn() }}>
						<View style={{height:48, width:190, position:'relative', alignSelf:'center', marginBottom:10, backgroundColor:Colors.bg}}>
							<Image source={require("../assets/images/button_border.png")} style={{height:48, width:190}} resizeMode={'stretch'} />
							<Text style={{color:Colors.white, position:'absolute', left:0,right:0, textAlign:'center', top:12, fontSize:16}}>Sign In</Text>
						</View>
					</TouchableOpacity>
					
					
					
					<TouchableOpacity style={{marginTop:16}} onPress={()=>{ NavigationService.navigate('ForgotPasswordScreen') }}>
						<Text style={{color:'#fff', textAlign:'center', fontSize:16}}>Forgot Password?</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{marginTop:16, marginBottom:60}} onPress={()=>{ NavigationService.navigate('SignupScreen') }}>
						<Text style={{color:'#fff', textAlign:'center', fontSize:16}}>Register</Text>
					</TouchableOpacity>
					
					
					<Button
						  icon={<Icon name="google" type="font-awesome" size={15} color="white" iconstyle={{marginRight:20}}/>}
						  iconLeft
						  title="Google"
							onPress={this.signInOrRegisterGoogle.bind(this)}
							titleStyle={{width:140, fontSize:16}}
							loading={isProcessingGoogle}
							buttonStyle={{width:300, height:48, backgroundColor:'#db3236', alignSelf:'center', marginBottom:10}}
						/>
					{/*
					<Button
							icon={<Icon name="facebook-official" type="font-awesome" size={15} color="white" iconstyle={{marginRight:20}}/>}
							iconLeft
							title="Facebook"
							onPress={this.signInOrRegisterFacebook.bind(this)}
							titleStyle={{width:140, fontSize:16}}
							loading={isProcessingFacebook}
							buttonStyle={{width:300, height:48, backgroundColor:'#3b5998', alignSelf:'center', marginBottom:10}}
						/>
					*/}
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
