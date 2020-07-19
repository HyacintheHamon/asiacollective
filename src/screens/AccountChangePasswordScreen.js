import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
	View,
  TouchableOpacity,
	FlatList,
	TextInput
} from "react-native";
import Button from "react-native-button";
//import FastImage from "react-native-fast-image";
import {
  AppIcon,
  AppStyles,
} from "../AppStyles";
import { Configuration } from "../Configuration";
import { StackActions, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
 import { inject, observer } from 'mobx-react/native';
 
@inject('userStore')
@observer
class AccountChangePasswordScreen extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
			oldPassword: null,
			password:null,
    };
  }
	
	handleChangePassword(){
		const UserStore = this.props.userStore;
		let newPassword = this.state.password;
		let oldPassword = this.state.oldPassword;
		if(newPassword && newPassword.length != 5){
			if(oldPassword && oldPassword.length != 5){
				UserStore.changepassword(oldPassword,newPassword, ()=>{
					UserStore.logoutUser();
					this.props.navigation.goBack();
				});
			}
		}
	}
 
  render() {
    return (
			<View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
				
				<View style={{position:'relative',  marginTop:20, paddingVertical:24, }}>
					<TouchableOpacity onPress={()=>{ this.props.navigation.goBack() }} style={{position:'absolute', left:0}}>
						<View style={{paddingVertical:18, paddingHorizontal:18}}>
							<Ionicons name="md-arrow-back" size={32} color={"#000"} />
						</View>
					</TouchableOpacity>
					<Text style={{ fontSize:16, alignSelf:'center'}}>CHANGE PASSWORD</Text>
				 
				</View>
				
				<View style={{alignItems:'center'}}>
				<View style={styles.InputContainer}>
					<Text style={{ fontSize:12}}>Old Password</Text>
					<TextInput
						style={styles.body}
						secureTextEntry={true}
						placeholder="Password"
						autoCapitalize={'none'}
						autoCorrect={false}
						onChangeText={text => this.setState({ oldPassword: text })}
						value={this.state.oldPassword}
						placeholderTextColor={AppStyles.color.grey}
						underlineColorAndroid="transparent"
					/>
				</View>
				
					<View style={styles.InputContainer}>
						<Text style={{ fontSize:12}}>New Password</Text>
						<TextInput
							style={styles.body}
							secureTextEntry={true}
							placeholder="Password"
							autoCapitalize={'none'}
							autoCorrect={false}
							onChangeText={text => this.setState({ password: text })}
							value={this.state.password}
							placeholderTextColor={AppStyles.color.grey}
							underlineColorAndroid="transparent"
						/>
					</View>
				</View>

				<Button
					containerStyle={styles.updatePassword}
					style={styles.btnText}
					onPress={()=>{ this.handleChangePassword() }}
				>
					Update Password
				</Button>
				
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontFamily: AppStyles.fontName.bold,
    fontWeight: "bold",
    color: AppStyles.color.title,
    fontSize: 25
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
  },
	updatePassword: {
    backgroundColor: '#E6C181',
    padding: 14,
    position:'absolute',
		bottom:0,
		left:0,
		right:0
  },
	btnText: {
    color: AppStyles.color.white
  },
	body: {
    height: 36,
    color: AppStyles.color.text
  }
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default AccountChangePasswordScreen;
