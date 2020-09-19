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
import {
  ErrorBar
} from '../../components';
import Button from "react-native-button";
import firebase from '@react-native-firebase/app';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppStyles } from "../AppStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from "../../constants/Colors";

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
      <View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>

				<View style={{position:'relative', alignItems:'center', marginTop:20, paddingVertical:24, }}>
					<TouchableOpacity onPress={()=>{ this.props.navigation.goBack() }} style={{position:'absolute', left:0}}>
						<View style={{paddingVertical:18, paddingHorizontal:18}}>
							<Ionicons name="md-close" size={32} color={"#000"} />
						</View>
					</TouchableOpacity>
					<Text style={{ fontSize:16}}>Forgot Password</Text>
				</View>


				<KeyboardAwareScrollView>
          <View style={{alignItems:'center'}}>


          <View style={styles.InputContainer}>
            <Text style={{ fontSize:12}}>Email</Text>
            <TextInput
              style={styles.body}
              placeholder="E-mail"
              onChangeText={email => this.setState({ email: email.trim() })}
              value={this.state.email}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
            </View>
            <Text style={{color:'gray', fontSize:12, marginTop:10, textAlign:'center'}}>{response}</Text>
          </View>

				</KeyboardAwareScrollView>

        <Button
          containerStyle={styles.btnContainer}
          style={styles.btnText}
          onPress={()=>{ this.handleResetPassword() }}>
          Send Reset Code
        </Button>
			</View>
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
  btnText: {
    color: AppStyles.color.white
  },
  btnContainer: {
    backgroundColor: '#E6C181',
    padding: 14,
    position:'absolute',
    bottom:0,
    left:0,
    right:0
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
