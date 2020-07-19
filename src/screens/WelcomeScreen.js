import React from "react";
import Button from "react-native-button";
import { Text, View, StyleSheet, Image, StatusBar, ActivityIndicator, Animated } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { AppStyles } from "../AppStyles";
//import firebase from "react-native-firebase";
import { AnimatedScaleFadeImage } from '../../components/index.js';

import { StackActions, NavigationActions } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';


@inject('userStore')
@observer
class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
			isRender:false,
    };
    //this.tryToLoginFirst();
		this.navigateToHome = this.navigateToHome.bind(this);
  }

	componentDidMount(){
    setTimeout(()=>{
      this.setState({isRender:true})
    },2000);


		var singletonHome = false;
		const UserStore = this.props.userStore;

    UserStore.getSettings(()=>{ });

		UserStore.isSignedIn((isSignedIn)=>{
			UserStore.onAuthStateChangedRef(); //unsubscribe


				if(singletonHome == false){
					singletonHome = true;
					console.log(isSignedIn);
					if(!isSignedIn){
						this.handleUserNotFound();
					}

					setTimeout(()=>{
						this.navigateToHome();
					},5000);
				}
		});
	}

	navigateToHome(){
		// this.onPressLogin()
		const resetHomeAction = StackActions.reset({
		  index: 0,
		  actions: [NavigationActions.navigate({ routeName: 'Home' })],
		});
		this.props.navigation.dispatch(resetHomeAction);
	}

	handleUserNotFound(){
		const UserStore = this.props.userStore;
		UserStore.logoutUser();
	}

  render() {
    return (
      <View style={styles.container}>
			<StatusBar backgroundColor="#231F20" barStyle={'light-content'} />

				 {this.state.isRender ? (<AnimatedScaleFadeImage
						style={{width:280, height:80}}
					 	resizeMode={"cover"}
						 source={require('../../assets/logo.png')}
					 />): null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
		backgroundColor:'#231F20'

  },
  logo: {
    width: 200,
    height: 200
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
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
  signupContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.white,
    borderRadius: AppStyles.borderRadius.main,
    padding: 8,
    borderWidth: 1,
    borderColor: AppStyles.color.tint,
    marginTop: 15
  },
  signupText: {
    color: AppStyles.color.tint
  },
  spinner: {
    marginTop: 200
  }
});

export default WelcomeScreen;
