import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { Icon } from 'react-native-elements';
import Colors from "../constants/Colors";
import firebase from '@react-native-firebase/app';
import NavigationService from "./NavigationService";
import { inject, observer } from 'mobx-react/native'
import {versionName, build} from '../app.json';
import { DrawerItems, SafeAreaView } from "react-navigation";

const { width, height } = Dimensions.get("window");

const IconText = props => (
		<TouchableOpacity
			onPress={props.onPress}
			style={{
				flexDirection: "row",
				alignItems: "center",
				paddingHorizontal: 16,
				marginVertical: 4,
				paddingVertical:10,
		}}
		>
		<Icon
			name={props.iconName}
			type={props.iconType}
			color={props.iconColor ? props.iconColor : Colors.gray}
			size={props.size ? props.size : 16}
			containerStyle={{width:24}}
		/>
		<Text style={{ color: props.fontColor ? props.fontColor : Colors.gray, marginLeft: 12, fontSize:11 }}>{props.text}</Text>
</TouchableOpacity>
);

@inject('userStore')
@observer
export default class CustomDrawerContent extends Component {


	handleSignOut(){
		this.props.navigation.replace('LoginScreen');
		const UserStore = this.props.userStore;
		UserStore.logoutUser();
	}
	

	renderAccount() {
		var {firstName,lastName, profileUrl, email} = this.props.userStore.user;
		var name = `${firstName} ${lastName}`;
		return (
			<View style={styles.accountContainer}>
				<Image
				style={{
					width: 48,
					height: 48,
					backgroundColor: "#7FA5C5",
					borderRadius: 4
				}}
					source={{uri: profileUrl}}
				/>
				<View style={styles.accountTextContainer}>
					<Text style={styles.text}>{ name || "Account Name"}</Text>
					<Text style={{ color: Colors.gray, fontSize: 11, marginTop: 2 }}>{email || ""}</Text>
				</View>
			</View>
		);
  }
	
	renderOptions() {
    return (
      <View>
			{/*this.renderLine('#111D2B')
			<IconText
			  iconName={"gear"}
			  iconType={'evilicon'}
			  text={'Settings'}
			  size={20}
			  onPress={() => NavigationService.navigate('SettingsScreen')}
			/> */}
			{this.renderLine('#111D2B')}
			<IconText
			  iconName={"bell"}
			  iconType={'simple-line-icon'}
			  text={'Set Status'}
			  size={14}
			  onPress={() => NavigationService.navigate('ChangeAvailabilityScreen')}
			/>
			{this.renderLine('#111D2B')}
			<IconText
			  iconName={"ios-albums"}
			  iconType={'ionicon'}
			  text={'List of subscriptions'}
			  size={14}
			  onPress={() => NavigationService.navigate('ListsScreen')}
			/>
			{this.renderLine('#111D2B')}
				<IconText
           iconName={"logout"}
           iconType={'simple-line-icon'}
           text={'Logout'}
			  	 size={14}
           onPress={() => this.handleSignOut()}
         />
         {this.renderLine('#111D2B')}
		 </View>)
	 }

  renderLine(color) {
    return (
      <View
        style={{
          width,
          height: 1,
          backgroundColor: color
        }}
      />
    );
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1,}}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}>
        <SafeAreaView style={styles.subContainer}>
			  	{this.renderAccount()}
					{this.renderOptions()}
			  	{this.renderLine()}
				<Text style={{
					fontWeight:'bold',
					color: Colors.white,
					fontSize:10,
					textAlign:"center",
					position:'absolute',
					left:10,
					bottom:10}}>{`Version ${versionName} Build: ${build}`}</Text>
			</SafeAreaView>
		</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.statusBarColor,
		paddingTop: 10,
	},
	subContainer: {
		flex: 1,
		justifyContent: "flex-start"
	},
	accountContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginBottom:20
	},
	accountTextContainer: {
		flex: 1,
		marginHorizontal: 16
	},
	text: {
		color: Colors.white
	},
	icon: {
		width: 24,
		height: 24
	}
});
