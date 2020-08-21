import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
	View,
  TouchableOpacity,
	FlatList,
} from "react-native";

//import FastImage from "react-native-fast-image";
import {
  AppIcon,
  AppStyles,
} from "../AppStyles";
import { Configuration } from "../Configuration";
import { StackActions, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { inject, observer } from 'mobx-react/native';

function capitalizeFirstLetter(string) {
    return string && string.charAt(0).toUpperCase() + string.substring(1);
};

@inject('userStore')
@observer
class AccountScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
			toggleBooks: false,
			books: [],
    };
  }

  componentDidMount() {
    // this.props.navigation.setParams({
    //   menuIcon: this.props.user.profileURL
    // });
		this.setState({ books: this.props.userStore.user.books });
  }

	handleOnAddBook(location,book, callback){
		this.props.userStore.addBook(location, book, (isValid)=>{
			if(isValid){
				this.setState({ books: this.props.userStore.user.books });
				console.log('success');
			}
			callback(isValid);
		});
	}

	navigateToLogin(){
		// this.onPressLogin()
		this.props.userStore.logoutUser();

		const resetHomeAction = StackActions.reset({
		  index: 0,
		  actions: [NavigationActions.navigate({ routeName: 'Login' })],
		});
		this.props.navigation.dispatch(resetHomeAction);
	}

  render() {
    const { books } = this.state;
		let isNotThirdPartyAuth = this.props.userStore.user.authSource.length == 0 ? false : true; // hide change password if via google
		console.log("isNotThirdPartyAuth", isNotThirdPartyAuth, this.props.userStore.user);
    return (
			<View style={{ flex: 1, backgroundColor:'#FFFFFF', paddingLeft:24,paddingRight:24}}>
				<Text style={{marginTop:36, marginBottom:36, fontSize:36}}>ACCOUNT</Text>

				<ScrollView
					showsVerticalScrollIndicator={false}
					horizontal={false}>
						<TouchableOpacity onPress={()=>{
							this.setState({ toggleBooks: !this.state.toggleBooks });
						}}>
							<View style={{flexDirection:'row', marginVertical:8, marginBottom:40, justifyContent:"space-between"}}>
								<Text style={{fontSize:15}}>Your Unique Code</Text>
								<Ionicons name={this.state.toggleBooks ? "ios-arrow-up" : "ios-arrow-down"} size={20} color={"#000"} />
							</View>
						</TouchableOpacity>
						{this.state.toggleBooks ? null : books.map((book,i)=>{
							return (<View key={`book-${i}`} style={{marginBottom:14}}><Text style={{fontSize:14}} key={"book-"+i}>{capitalizeFirstLetter(book.split("_")[0])}</Text><Text>{book.split("_")[1].toUpperCase()}</Text></View>);
						})}


						{books.length == 0 ? (<View style={{flexDirection:'row', marginVertical:16, marginBottom:30}}>
							<Text style={{color:'#EB19STOF'}}>Enter your </Text>
							<TouchableOpacity onPress={()=> { this.props.navigation.navigate('AccountAddCode', { handleOnAddBook: this.handleOnAddBook.bind(this) }) }}>
								<Text style={{color:'#D5B172'}}>Unique Code here</Text>
							</TouchableOpacity>
						</View>) : (<View style={{flexDirection:'row', marginVertical:16, marginBottom:30}}>
							<Text style={{color:'#EB19STOF'}}>Have another code? </Text>
							<TouchableOpacity onPress={()=> { this.props.navigation.navigate('AccountAddCode', { handleOnAddBook: this.handleOnAddBook.bind(this) }) }}>
								<Text style={{color:'#D5B172'}}>Add it here</Text>
							</TouchableOpacity>
						</View>)}

						{!isNotThirdPartyAuth?(<View><View style={{height:1, backgroundColor:'#B5B5B5'}}></View>
						<TouchableOpacity onPress={()=>{ this.props.navigation.navigate('AccountChangePassword') }}>
							<Text style={{paddingVertical:16, fontSize:17}}>Change Password</Text>
						</TouchableOpacity></View>):null}

						<View style={{height:1, backgroundColor:'#B5B5B5'}}></View>
						<TouchableOpacity onPress={()=>{ this.props.navigation.navigate('AccountTerm') }}>
							<Text style={{paddingVertical:16, fontSize:17}}>Terms & Conditions</Text>
						</TouchableOpacity>
						<View style={{height:1, backgroundColor:'#B5B5B5'}}></View>
						<TouchableOpacity onPress={()=>{ this.props.navigation.navigate('AccountHelp') }}>
							<Text style={{paddingVertical:16, fontSize:17}}>Help</Text>
						</TouchableOpacity>
						<View style={{height:1, backgroundColor:'#B5B5B5'}}></View>
						<TouchableOpacity onPress={()=>{ this.navigateToLogin(); }}>
							<Text style={{paddingVertical:16, fontSize:17}}>Logout</Text>
						</TouchableOpacity>
						<View style={{height:1, backgroundColor:'#B5B5B5'}}></View>

						<Text style={{marginTop:16, color:'#B5B5B5', paddingBottom:50}}>Version 1.0.4</Text>

				</ScrollView>
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
  }
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default AccountScreen;
