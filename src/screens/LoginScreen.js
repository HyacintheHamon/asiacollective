import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
	TouchableOpacity,
  Alert,
	Image,
  ActivityIndicator
} from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { inject, observer } from 'mobx-react/native';

import firebase from '@react-native-firebase/app';
import { LoginButton, AccessToken,LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

GoogleSignin.configure({
	"webClientId":"846693707910-7ith053ugvigrp1kuoogpoksevm35cn1.apps.googleusercontent.com"
});


@inject('userStore')
@observer
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      password: "",
			isProcessingGoogle: false,

			isRenderLoginPage:false,
      isEnableThirdPartyLogin: false
    };
  }

	componentDidMount(){
		var singletonIsSignedIn = false;
		const UserStore = this.props.userStore;
		UserStore.isSignedIn((isSignedIn)=>{
			UserStore.onAuthStateChangedRef(); //unsubscribe

			if(singletonIsSignedIn == false){
				singletonIsSignedIn = true;
				console.log(isSignedIn);
				if(!isSignedIn){
					this.setState({isRenderLoginPage: true });
					this.handleUserNotFound();
					return;
				}


				this.navigateToAccount();
			}
		});

	}

	handleUserNotFound(){
		const UserStore = this.props.userStore;
		UserStore.logoutUser();
	}

	async signInOrRegisterGoogle() {
		this.setState({ isProcessingGoogle: true });
		await GoogleSignin.hasPlayServices();
		GoogleSignin.signIn().then((payload) => {
			console.log("payload",payload);
			this.props.userStore.socialLogin('google', payload, this.handleSignInResponse.bind(this));
		}).catch(function(){
			this.setState({ isProcessingGoogle: false });
		});
	}
	
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

			this.navigateToAccount();
	}


	navigateToLoginWithEmail(){
		this.props.navigation.navigate('LoginEmail');
	}

	navigateToSignUpWithEmail(){
		this.props.navigation.navigate('SignUp');
	}

	navigateToAccount(){
		const resetHomeAction = StackActions.reset({
		  index: 0,
		  actions: [NavigationActions.navigate({ routeName: 'Account' })],
		});
		this.props.navigation.dispatch(resetHomeAction);
	}

  renderThirdPartyLogin(){
    return (<View>

      {this.state.isProcessingFacebook ? (
        <ActivityIndicator
          style={{ marginTop: 30 }}
          size="small"
          animating={this.state.isProcessingFacebook}
          color={'pink'}
        />
      ) : (

      <TouchableOpacity onPress={this.signInOrRegisterFacebook.bind(this)}>
         <View style={styles.btnFacebook}>
         <Ionicons name="logo-facebook" size={22} color={"#fff"} />
           <Text style={{marginLeft:12, fontSize:14, color:"#fff", marginTop:2}}>Sign In with Facebook</Text>
         </View>
	  </TouchableOpacity>)}


      {this.state.isProcessingGoogle ? (
        <ActivityIndicator
          style={{ marginTop: 30 }}
          size="small"
          animating={this.state.isProcessingGoogle}
          color={'pink'}
        />
      ) : (
        <TouchableOpacity onPress={this.signInOrRegisterGoogle.bind(this)}>
           <View style={styles.btnGoogle}>
           <Image source={require('../../assets/logo-google.png')} style={{width:16, height:16}} />
             <Text style={{marginLeft:12, fontSize:14, color:"#000", marginTop:2}}>Sign In with Google</Text>
           </View>
        </TouchableOpacity>
      )}

        <View style={{height:40, width:300, alignSelf:'center', marginVertical:10}}>
          <View style={{height:1, backgroundColor:'#989898', marginTop:20}}></View>
          <Text style={styles.or}>OR</Text>
        </View>

    </View>)
  }

	renderLogin(){
    const { isEnableThirdPartyLogin } = this.props.userStore.user;
		return (<View>
        <View style={{height:240}}>
        { isEnableThirdPartyLogin ? this.renderThirdPartyLogin() : null }
        </View>
				 <TouchableOpacity onPress={() => this.navigateToLoginWithEmail()}>
						<View style={styles.btnNormal}>
						<Ionicons name="ios-mail" size={22} color={"#fff"} />
							<Text style={{marginLeft:12, fontSize:14, color:"#fff", marginTop:2}}>Sign In with Email</Text>
						</View>
				 </TouchableOpacity>

				<View style={{flexDirection:'row', marginTop:20}}>
					<Text style={{color:'#989898'}}>Don't have an account? </Text>
					<TouchableOpacity onPress={()=> this.navigateToSignUpWithEmail()}>
						<Text style={{color:'#D8B06C'}}>Sign up</Text>
					</TouchableOpacity>
				</View>
		</View>);
	}

	renderLoading(){
		return (<View>

		</View>);
	}

  render() {
    return (
			<View style={{ flex: 1, backgroundColor:'#FFFFFF', paddingLeft:20,paddingRight:20}}>
        <Text style={{marginTop:36, marginBottom:36, fontSize:36}}>ACCOUNT</Text>

				{this.state.isRenderLoginPage ? this.renderLogin() : this.renderLoading()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
	btnNormal:{
		backgroundColor:"#D8B06C",
		paddingVertical:9,
		paddingHorizontal:20,
		flexDirection:'row'
	},
	btnFacebook: {
		backgroundColor:"#4469B0",
		paddingVertical:10,
		paddingHorizontal:20,
		flexDirection:'row',
		marginBottom:20,
		borderRadius:3,
	},
	btnGoogle: {
		backgroundColor:"#fff",
		paddingVertical:10,
		paddingHorizontal:20,
		marginBottom:20,
		flexDirection:'row',
		borderWidth:0.5,
		borderColor:'#D2D2D2',
		borderRadius:3,
	},
  container: {
    flex: 1,
    alignItems: "center"
  },
  or: {
    color: "#989898",
    position:'absolute',
		textAlign:'center',
		width:50,
		backgroundColor:'#fff',
		left:125,
		height:40,
		lineHeight:40,
		fontSize:16
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: 192,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  },
  googleContainer: {
    width: 192,
    height: 48,
    marginTop: 30
  },
  googleText: {
    color: AppStyles.color.white
  }
});

export default LoginScreen;
