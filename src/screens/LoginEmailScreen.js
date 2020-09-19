import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
	TouchableOpacity,
  View,
  Alert,
  ActivityIndicator
} from "react-native";
import {
  ErrorBar
} from '../../components';
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { inject, observer } from 'mobx-react/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

@inject('userStore')
@observer
class LoginEmailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      password: "",
			errors: []
    };
  }


	navigateToHome(){
		// this.onPressLogin()
		const resetHomeAction = StackActions.reset({
		  index: 0,
		  actions: [NavigationActions.navigate({ routeName: 'Account' })],
		});
		this.props.navigation.dispatch(resetHomeAction);
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
			if(!isSignedIn){
				errors.push("Failed to login");
				this.setState({errors:errors});
				this.handleUserNotFound();
				return;
			}

			this.navigateToHome();
	}


	handleUserNotFound(){
		const UserStore = this.props.userStore;
		UserStore.logoutUser();
	}

  render() {
    return (
			<View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>

				<View style={{position:'relative', alignItems:'center', marginTop:20, paddingVertical:24, }}>
					<TouchableOpacity onPress={()=>{ this.props.navigation.goBack() }} style={{position:'absolute', left:0}}>
						<View style={{paddingVertical:18, paddingHorizontal:18}}>
							<Ionicons name="md-close" size={32} color={"#000"} />
						</View>
					</TouchableOpacity>
					<Text style={{ fontSize:16}}>SIGN IN</Text>
				</View>

        <KeyboardAwareScrollView>
          <View style={{alignItems:'center'}}>

  					<View style={styles.InputContainer}>
  						<Text style={{ fontSize:12}}>Email</Text>
  						<TextInput
  							style={styles.body}
  							placeholder="E-mail or phone number"
  							onChangeText={text => this.setState({ email: text.trim() })}
  							value={this.state.email}
  							autoCapitalize={'none'}
  							autoCorrect={false}
  							placeholderTextColor={AppStyles.color.grey}
  							underlineColorAndroid="transparent"
  						/>
  					</View>
  					<View style={styles.InputContainer}>
  						<Text style={{ fontSize:12}}>Password</Text>
  						<TextInput
  							style={styles.body}
  							secureTextEntry={true}
  							placeholder="Password"
  							autoCapitalize={'none'}
          			autoCorrect={false}
  							onChangeText={text => this.setState({ password: text.trim() })}
  							value={this.state.password}
  							placeholderTextColor={AppStyles.color.grey}
  							underlineColorAndroid="transparent"
  						/>
  					</View>

            <ErrorBar errors={this.state.errors}/>

            <View style={[ styles.InputContainer, {borderColor: 'transparent',flexDirection:'row', marginTop:30}]}>
    					<Text style={{color:'#989898'}}>Forgot password? </Text>
    					<TouchableOpacity onPress={()=> this.props.navigation.navigate('ForgotPasswordScreen')}>
    						<Text style={{color:'#D8B06C'}}>Click here</Text>
    					</TouchableOpacity>
    				</View>

  				</View>
        </KeyboardAwareScrollView>

        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={()=>{ this.handleSignIn() }}
        >
          Log in
        </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  or: {
    color: "black",
    marginTop: 40,
    marginBottom: 10
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
    backgroundColor: '#E6C181',
    padding: 14,
    position:'absolute',
		bottom:0,
		left:0,
		right:0
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
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
  },
  body: {
    height: 36,
    color: AppStyles.color.text
  }
});

export default LoginEmailScreen;
