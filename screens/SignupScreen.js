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
import firebase from '@react-native-firebase/app';
import {   Icon } from 'react-native-elements';
import {
	HeaderComponent,
	NotificationItem,
	ErrorBar
} from '../components';
import Colors from "../constants/Colors";
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationService from '../navigation/NavigationService';
import { inject, observer } from 'mobx-react/native'

@inject('userStore')
@observer
export default class SignupScreen extends Component<Props> {

	constructor(props) {
		super(props);
		this.state = {
			errors: [],
			email: "",
			password: "",

			confirmPassword: "",
			contact:"",
			firstName:"",
			lastName:"",
		}
	}

	componentDidMount(){

	}

	handleSignup(){
		const { email,password,confirmPassword, firstName,lastName,contact } = this.state;
		var errors = [];
		if(email.length == 0){
			errors.push("Error email empty");
      this.setState({errors:errors});
			return;
		}
		if(password.length == 0){
			errors.push("Error password empty");
      this.setState({errors:errors});
			return;
		}
		if(password !== confirmPassword){
			errors.push("Error password and confirm password do not match");
      this.setState({errors:errors});
			return;
		}
		
		var user = {
			email,
			password,
			firstName,
			lastName,
			contact,
			devices: []
		};
		
		const UserStore = this.props.userStore;
		UserStore.signUp(user,(isSuccess, errorMessage)=>{
			if(!isSuccess){
				if(errorMessage){
					errors.push(errorMessage);
				}
				else {
					errors.push("Registration failed");
				}
	      this.setState({errors:errors});
				return;
			}
			
			NavigationService.forceReplace('HomeScreen');
		})
		
		
	}

	render() {
		const { email,password,confirmPassword, firstName,lastName,contact } = this.state;
		return (
			<HeaderComponent
				title={''}
				enableLeftIcon={false}
				enableRightIcon={false}>
				<StatusBar barStyle="light-content" backgroundColor={Colors.statusBarColor}/>

				<Text style={{color:Colors.grayPrimary, fontSize:16, textAlign:'center'}}>Register</Text>


				<ScrollView
					contentContainerStyle={{flexGrow: 1}}
					nestedScrollEnabled={true}
					showsVerticalScrollIndicator={false}
					automaticallyAdjustContentInsets={false}>
					<View style={{position:'relative', alignSelf:'center', height:44, marginTop:20, marginBottom: 4, width:280,}}>
						<Image source={require("../assets/images/textinput_bg.png")} style={{height:44, width:280}} resizeMode={'stretch'} />
						<TextInput
							style={{position:'absolute', left:0,right:0,bottom:0,top:0,height: 44,width:280, borderColor: 'transparent', backgroundColor:'transparent', textAlign:'center', color:'#fff'}}
							placeholder={'First name'}
							placeholderTextColor={Colors.gray}
							onChangeText={firstName => this.setState({ firstName })}
							value={firstName}
						/>
					</View>
					<View style={{position:'relative', alignSelf:'center', height:44, marginTop:4, marginBottom: 4, width:280,}}>
						<Image source={require("../assets/images/textinput_bg.png")} style={{height:44, width:280}} resizeMode={'stretch'} />
						<TextInput
							style={{position:'absolute', left:0,right:0,bottom:0,top:0,height: 44,width:280, borderColor: 'transparent', backgroundColor:'transparent', textAlign:'center', color:'#fff'}}
							placeholder={'Last name'}
							placeholderTextColor={Colors.gray}
							onChangeText={lastName => this.setState({ lastName })}
							value={lastName}
						/>
					</View>
					<View style={{position:'relative', alignSelf:'center', height:44, marginTop:4, marginBottom: 4, width:280,}}>
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
					</View>
					<View style={{position:'relative', alignSelf:'center', height:44, marginTop:4, marginBottom: 4, width:280,}}>
						<Image source={require("../assets/images/textinput_bg.png")} style={{height:44, width:280}} resizeMode={'stretch'} />
						<TextInput
							style={{position:'absolute', left:0,right:0,bottom:0,top:0,height: 44,width:280, borderColor: 'transparent', backgroundColor:'transparent', textAlign:'center', color:'#fff'}}
							placeholder={'Contact'}
							placeholderTextColor={Colors.gray}
							onChangeText={contact => this.setState({ contact })}
							value={contact}
						/>
					</View>
					<View style={{position:'relative', alignSelf:'center', height:44, marginTop:4, marginBottom: 4, width:280,}}>
						<Image source={require("../assets/images/textinput_bg.png")} style={{height:44, width:280}} resizeMode={'stretch'} />
						<TextInput
							style={{position:'absolute', left:0,right:0,bottom:0,top:0,height: 44,width:280, borderColor: 'transparent', backgroundColor:'transparent', textAlign:'center', color:'#fff'}}
							placeholder={'Password'}
							placeholderTextColor={Colors.gray}
							secureTextEntry={true}
							onChangeText={password => this.setState({ password })}
							value={password}
						/>
					</View>
					<View style={{position:'relative', alignSelf:'center', height:44, marginTop:4, marginBottom: 20, width:280,}}>
						<Image source={require("../assets/images/textinput_bg.png")} style={{height:44, width:280}} resizeMode={'stretch'} />
						<TextInput
							style={{position:'absolute', left:0,right:0,bottom:0,top:0,height: 44,width:280, borderColor: 'transparent', backgroundColor:'transparent', textAlign:'center', color:'#fff'}}
							placeholder={'Confirm Password'}
							placeholderTextColor={Colors.gray}
							secureTextEntry={true}
							onChangeText={confirmPassword => this.setState({ confirmPassword })}
							value={confirmPassword}
						/>
					</View>
					<ErrorBar errors={this.state.errors}/>


					<TouchableOpacity onPress={()=>{ this.handleSignup() }}>
						<View style={{height:45, width:100, position:'relative', alignSelf:'center', marginBottom:40}}>
							<Image source={require("../assets/images/button_border.png")} style={{height:45, width:100}} resizeMode={'stretch'} />
							<Text style={{color:Colors.white, position:'absolute', left:0,right:0, textAlign:'center', top:12, fontSize:16}}>Register</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={{marginTop:20}} onPress={()=>{ this.props.navigation.goBack() }}>
						<Text style={{color:Colors.white, textAlign:'center', fontSize:16}}>Cancel</Text>
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
