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
 

class AccountHelpScreen extends React.Component {
  

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
					<Text style={{ fontSize:16, alignSelf:'center'}}>HELP</Text>
					 
					<ScrollView>
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>1. I ordered the e-book version of Hungry in Bali – how does it work?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
						You will receive an order confirmation to your email address including
						{"\n"} download link of the e-book file in PDF.
						{"\n"} download link of the e-book file in PDF.
						{"\n\n"} Simply download the e-book file to your phone or iPad (see below how to best save a PDF) and also download your unique code or save a screenshot. You will need to present it along with the book when redeeming your unique privileges at Bali’s best venues.
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>2. I ordered the premium print version of Hungry in Bali – what next?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
						You will receive an order confirmation to your email address including
						{"\n"} Download link of your unique code in PDF
						{"\n"} Your shipping information which is where we will send the premium print version
						{"\n\n"} Download your unique code or save a screenshot as you will need to present it along with the book when redeeming your unique privileges at Bali’s best venues
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>3. What is the best way to save my e-book PDF to my phone?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
						IPHONE
						{"\n"} You can open the HUNGRY IN BALI e-book with iBooks
						{"\n"} 1.) Open your HUNGRY IN BALI -bookmail with the PDF attachment, and tap the attachment
						{"\n"} 2.) Tap the Share icon
						{"\n"} 3.) Tap “Copy to iBooks” to open the attachment in iBooks. If you don’t have this option, try tapping on the PDF and an “Open in iBooks” option should appear
						{"\n\n"}
						ANDROID
						{"\n"} 1.) Open the Google Play Books app
						{"\n"} 2.) Tap Menu Settings Enable PDF uploading
						{"\n"} 3.) Download the HUNGRY IN BALI PDF attachment on your device
						{"\n"} 4.) Open your Downloads or My Files app
						{"\n"} 5.) Find the file
						{"\n"} 6.) Tap More, Open With Play Books or Upload to Play Books
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>4. How many venues are included and in which areas of Bali?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							HUNGRY IN BALI 2018/2019 features the 54 most stunning venues in Seminyak, Canggu, Ubud and Bukit Peninsula including fine dining restaurants, must-visit cafés, trendy beach clubs and 6 beautiful spas
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>5. How What do the privileges offer?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							Each privilege is unique per venue – you might get a percentage off your total bill, 2-for-1 main dishes or a little extra on top of your amazing dining experience. Explore the culinary highlights yourself and SHOP HUNGRY IN BALI NOW.
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>6. Can I bring my family/friends? For how many people is it valid?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							You’re absolutely welcome to bring your fellow travel partners and loved ones. Two people may use one book, 4 people may use two books and so on. SHOP MORE and pay less, discounts apply for multiple e-book purchases within one transaction
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>7. Can I use the privileges more than once?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							Every privilege is only valid once and assigned to the unique code you receive with your order confirmation. Once it has been used, the venue will mark it as redeemed in their system and it cannot be used again
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>8. I lost my unique code – what to do?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							Simply send an email with your full name and order number as well as payment receipt to hungryinbali@theasiacollective.com and we will resend it to you
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>9. The waiter says my code is invalid – what to do?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							Kindly send an email to hungryinbali@theasiacollective.com and we will assist you within 24 hours.
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>10. Can I pass on the book to family/friends if I didn’t use all privileges?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							Yes – you’re welcome to pass on your HUNGRY IN BALI book to family and friends so they can enjoy the unique privileges you haven’t used!
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>11. Do I have to make a reservation beforehand?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							We highly recommend to make a reservation beforehand as many venues are often fully booked especially during high season but you’re also welcome to stop by spontaneously! Please note Hungry in Bali doesn’t give you any special privileges when the venue is full.
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>12. I am already in Bali – can you ship a book to my hotel?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							Simply buy the e-book PDF version of HUNGRY IN BALI – it will get sent to you immediately after payment verification and you can use it within minutes of purchase!
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>13. I deleted the email with the download link and cannot find it anymore – what to do?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							Simply send an email with your full name and order number as well as payment receipt to hungryinbali@theasiacollective.com and we will resend it to you!
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>14. Why do I need to show a unique code?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							The privileges can only be used once at each venue, therefore your unique code needs to be marked as redeemed by each venue you visit and cross-checked if it has been used before
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>15. Can I purchase HUNGRY IN BALI as a gift?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							Absolutely – and what a great gift it is!
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>16. Is there an expiration date on my privileges?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							{"\n"} HUNGRY IN BALI 2018/2019 is valid until July, 31st 2019.
							{"\n"} HUNGRY IN BALI 2018/2019 is valid until July, 31st 2019.
						</Text>
						
						<Text style={{ fontSize:14, marginTop:40, paddingHorizontal:24, color: '#be9252'}}>17. Can I pay HUNGRY IN BALI via credit card?</Text>
						<Text style={{ fontSize:13, color:'gray', padding:24, paddingTop:10, lineHeight:24}}>
							You can easily and safely pay by credit card, debit card or Paypal credit. And yes, you can pay via credit or debit card if you don’t have Paypal! Just follow the “Checkout with Paypal” link and click on “Pay with Credit or Debit card” at the bottom
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

export default AccountHelpScreen;
