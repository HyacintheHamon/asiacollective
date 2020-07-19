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
 

class AccountTermScreen extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
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
					<Text style={{ fontSize:16, alignSelf:'center'}}>TERMS & CONDITIONS</Text>
					
					<ScrollView>
						<Text style={{ fontSize:14, marginTop:40, paddingLeft:24, color: '#be9252'}}>PAYMENT</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
						You can easily and safely pay by credit card, debit card or Paypal credit. And yes, you can pay via credit or debit card if you don’t have Paypal! Just follow the “Checkout with Paypal” link and click on “Pay with Credit or Debit card” at the bottom.
						{"\n\n"} At the moment, we unfortunately don’t accept payments via bank transfer.
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingLeft:24, color: '#be9252'}}>RETURNS</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
						Kindly note we don’t accept returns
						</Text>
					
						<Text style={{ fontSize:14, marginTop:40, paddingLeft:24, color: '#be9252'}}>CUSTOMER SERVICE</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
						You can reach our customer service for any queries at hungryinbali@theasiacollective.com.
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingLeft:24, color: '#be9252'}}>PERSONAL INFORMATION</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
						Any personal information that you provide to us during the purchase process will not be released, sold or rented to any entities or individuals outside of The Asia Collective.
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingLeft:24, color: '#be9252'}}>HUNGRY IN BALI PRIVILEGES</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
						
						</Text>
						
					</ScrollView>
					
				 </View>
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

export default AccountTermScreen;
