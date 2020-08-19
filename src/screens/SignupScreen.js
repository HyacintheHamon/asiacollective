import React from "react";
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
//import firebase from "react-native-firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackActions, NavigationActions } from 'react-navigation';
import {
	ErrorBar
} from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { inject, observer } from 'mobx-react/native';
@inject('userStore')
@observer
class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
			errors: [],
			email: "",
			password: "",

			phone:"",
			firstName:"",
			lastName:"",
		}
  }

	handleSignup(){
		const { email,password, firstName,lastName, phone } = this.state;
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

		var user = {
			email,
			password,
			firstName,
			lastName,
			phone
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

			//NavigationService.forceReplace('HomeScreen');
			this.navigateToHome();
		});


	}

  componentDidMount() {
    // this.authSubscription = firebase.auth().onAuthStateChanged(user => {
    //   this.setState({
    //     loading: false,
    //     user
    //   });
    // });
  }

  componentWillUnmount() {
    //this.authSubscription();
  }

  onRegister = () => {
    // const { email, password } = this.state;
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(response => {
    //     const { navigation } = this.props;
    //     const { fullname, phone, email } = this.state;
    //     const data = {
    //       email: email,
    //       fullname: fullname,
    //       phone: phone,
    //       appIdentifier: "rn-android-universal-listings"
    //     };
    //     user_uid = response.user._user.uid;
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(user_uid)
    //       .set(data);
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(user_uid)
    //       .get()
    //       .then(function(user) {
    //         navigation.dispatch({ type: "Login", user: user });
    //       })
    //       .catch(function(error) {
    //         const { code, message } = error;
    //         alert(message);
    //       });
    //   })
    //   .catch(error => {
    //     const { code, message } = error;
    //     alert(message);
    //   });
  };

	navigateToHome(){
		// this.onPressLogin()
		const resetHomeAction = StackActions.reset({
		  index: 0,
		  actions: [NavigationActions.navigate({ routeName: 'Account' })],
		});
		this.props.navigation.dispatch(resetHomeAction);
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
					<Text style={{ fontSize:16}}>SIGN UP</Text>
					<ErrorBar errors={this.state.errors}/>
				</View>

				<KeyboardAwareScrollView>
	        <View style={{alignItems:'center'}}>
							<View style={styles.InputContainer}>
							<Text style={{ fontSize:12}}>First Name</Text>
								<TextInput
									style={styles.body}
									placeholder="First Name"
									onChangeText={text => this.setState({ firstName: text })}
									value={this.state.firstName}
									autoCorrect={false}
									placeholderTextColor={AppStyles.color.grey}
									underlineColorAndroid="transparent"
								/>
							</View>
							<View style={styles.InputContainer}>
							<Text style={{ fontSize:12}}>Last Name</Text>
								<TextInput
									style={styles.body}
									placeholder="Last Name"
									onChangeText={text => this.setState({ lastName: text })}
									value={this.state.lastName}
									autoCorrect={false}
									placeholderTextColor={AppStyles.color.grey}
									underlineColorAndroid="transparent"
								/>
							</View>
							<View style={styles.InputContainer}>
								<Text style={{ fontSize:12}}>Phone Number</Text>
								<TextInput
									style={styles.body}
									placeholder="Phone Number"
									onChangeText={text => this.setState({ phone: text })}
									value={this.state.phone}
									autoCorrect={false}
									placeholderTextColor={AppStyles.color.grey}
									underlineColorAndroid="transparent"
								/>
							</View>
							<View style={styles.InputContainer}>
								<Text style={{ fontSize:12}}>E-mail Address</Text>
								<TextInput
									style={styles.body}
									placeholder="E-mail Address"
									onChangeText={text => this.setState({ email: text })}
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
									placeholder="Password"
									secureTextEntry={true}
									onChangeText={text => this.setState({ password: text })}
									value={this.state.password}
									placeholderTextColor={AppStyles.color.grey}
									underlineColorAndroid="transparent"
								/>
							</View>
					</View>
				</KeyboardAwareScrollView>
        <Button
          containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
          style={styles.facebookText}
          onPress={()=>{ this.handleSignup() }}>
          Sign Up
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
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
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
  },
	body: {
    height: 36,
    color: AppStyles.color.text
  },
  facebookContainer: {
		backgroundColor: '#E6C181',
    padding: 14,
    position:'absolute',
		bottom:0,
		left:0,
		right:0
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default SignupScreen;
