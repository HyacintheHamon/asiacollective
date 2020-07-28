import React from "react";
import { View,
	Text,
	Dimensions,
	ScrollView,
	StatusBar,
	RefreshControl,TouchableOpacity,
	Image,
	ActivityIndicator,
	Alert,
	Linking
} from "react-native";

import Toast, {DURATION} from 'react-native-easy-toast';

import { inject, observer } from 'mobx-react/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
var {width,height} = Dimensions.get('window');

import {
	LocationItem,
} from '../../components/index.js';
var { width } = Dimensions.get('window')

function DropDown({ txt1, txt2, subtitle }){
	return (<View style={{paddingHorizontal: 30,  paddingVertical:10, marginVertical:4, position:'relative',}}>
		<Text style={{marginVertical:2}}>{txt1}</Text>
		<Text style={{marginVertical:2}}>{txt2}</Text>
		<EvilIcons name={"clock"} size={30} color={"#000"} style={{position:'absolute', top:15, left:-4}} />
	</View>);
}
function DropDown2({ txt1, txt2, subtitle }){
	return (<View style={{paddingHorizontal: 30,  paddingVertical:10, marginVertical:4, position:'relative',}}>
		<Text>{txt1}</Text>
		<Text>{txt2}</Text>
		<SimpleLineIcons name={"location-pin"} size={24} color={"#000"} style={{position:'absolute', top:15, left:-4}} />
	</View>);
}
function ContactLinks({handleOnBook, handleOnDirection, handleOnWebsite, handleOnCall}){
 return (<View style={{flexDirection:'row', marginVertical:20, justifyContent:'space-around', marginBottom:30}}>
	 <TouchableOpacity activeOpacity={0.8} onPress={()=>{ handleOnWebsite() }}>
		 <View style={{width:80}}>
			 <View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
				 <Octicons name={"globe"} size={30} color={"#E7B876"}  />
			 </View>
			 <Text style={{ width:80, marginTop:8, textAlign:'center', fontSize:12, color:"#E7B876"}}>Website</Text>
		 </View>
	 </TouchableOpacity>
	 <TouchableOpacity activeOpacity={0.8} onPress={()=>{ handleOnCall() }}>
		 <View style={{width:80}}>
			 <View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
				 <Ionicons name={"ios-call"} size={30} color={"#E7B876"}  />
			 </View>
			 <Text style={{ width:80, marginTop:8, textAlign:'center', fontSize:12, color:"#E7B876"}}>Call</Text>
		 </View>
	 </TouchableOpacity>
	 <TouchableOpacity activeOpacity={0.8} onPress={()=>{ handleOnDirection() }}>
		 <View style={{width:80}}>
			 <View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
				 <FontAwesome5 name={"directions"} size={30} color={"#E7B876"}  />
			 </View>
			 <Text style={{ width:80, marginTop:8, textAlign:'center', fontSize:12, color:"#E7B876"}}>Direction</Text>
		 </View>
	 </TouchableOpacity>
	 <TouchableOpacity activeOpacity={0.8} onPress={()=>{ handleOnBook() }}>
		 <View style={{width:80}}>
			 <View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
				 <Octicons name={"calendar"} size={30} color={"#E7B876"}  />
			 </View>
			 <Text style={{ width:80, marginTop:8, textAlign:'center', fontSize:12, color:"#E7B876"}}>Book A Table</Text>
		 </View>
	 </TouchableOpacity>
 </View>)
}

@inject('userStore')
@observer
class PreviewScreen extends React.Component {
	constructor(props){
		super();
		this.state = {
			isModalVisible: false,
			isFetchingOffers: true,
			offers: []
		}
	}

	componentDidMount(){
		let {venue} = this.props.navigation.state.params;
		this.setState({isFetchingOffers: true });
		this.props.userStore.getOffer(venue.id, (offers)=>{
			this.setState({ isFetchingOffers: false, offers: offers });
		});
	}

	toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

	handleOnBarCodeReceived(event) {
		//Toast.show('Type: ' + event.type + '\nData: ' + event.data);
		this.props.userStore.checkVenueQr({code:event.data}, (isValid)=>{
			if(isValid){
				Alert.alert(
					"Success",
					"Offer can now be claimed.",
					[{ text: "OK", onPress: () => console.log("OK Pressed") }],
					{ cancelable: true }
				);
			}
			else {
				Alert.alert(
					"Error",
					"Offer invalid.",
					[{ text: "CANCEL", onPress: () => console.log("OK Pressed") }],
					{ cancelable: true }
				);
			}
		});
	};

	renderOffer(offer){
		return (<View style={{marginVertical:10, marginBottom: 30, borderStyle: 'dashed', borderRadius: 1, borderColor:'#E7B876', borderWidth:2, padding:12, paddingBottom:60, position:'relative'}}>
			<View style={{
				width: 0,
						 height: 0,
						 backgroundColor: 'transparent',
						 borderStyle: 'solid',
						 borderLeftWidth: 30,
						 borderTopWidth: 30,
						 borderLeftColor: 'transparent',
						 borderTopColor: '#E7B876',
						 position:'absolute',
						 right:-2,
						 top:-2
				}} />
			<Text style={{marginVertical:6, fontSize:16}}>{offer.offer_title}</Text>
			<Text style={{marginBottom:10, color:'gray', fontSize:12}}>{offer.offer_condition ? offer.offer_condition: ""}</Text>
			<Text style={{marginBottom:10, color:'gray', fontSize:12}}>{offer.offer_description}</Text>
			<TouchableOpacity
			onPress={()=>{ this.props.navigation.navigate('ScanScreen', { handleOnBarCodeReceived: this.handleOnBarCodeReceived.bind(this) }) }}
					activeOpacity={0.8} style={{position:'absolute', bottom: -2, left:-2, right:-2}}>
				<View style={{ height:40, backgroundColor: '#E7B876', alignItems:'center', justifyContent:'center'}}>
					<Text style={{color:'#fff'}}>Redeem Privilege</Text>
				</View>
			</TouchableOpacity>
		</View>);
	}

	showToastMessage(message){
		this.refs.toast.show(message, 500, () => {

		});
	}

	render() {
		let {venue} = this.props.navigation.state.params;
		let { offers, isFetchingOffers } = this.state;
    return (
			<View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
				<StatusBar backgroundColor="white" barStyle={'dark-content'} />
				<View style={{position:'relative',  marginTop:20, paddingVertical:24, }}>
					<TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.props.navigation.goBack() }} style={{position:'absolute', left:0}}>
						<View style={{paddingVertical:18, paddingHorizontal:18}}>
							<Ionicons name="md-arrow-back" size={32} color={"#000"} />
						</View>
					</TouchableOpacity>
					<Text style={{ fontSize:16, alignSelf:'center'}}></Text>

				</View>

					<ScrollView
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}>
							<Image source={{uri: venue.image}} style={{width:width, height:width}} />
							<View style={{padding:24}}>
								<Text style={{fontSize:18, paddingVertical:4}}>{venue.title}</Text>
								<Text style={{color:'gray', marginBottom:14, fontSize:12}}>{venue.cuisine} {venue.category}</Text>

								{isFetchingOffers ? (<ActivityIndicator size="small" color="#000" />) : offers.map((offer)=>{
									return this.renderOffer(offer)
								})}

								<Text style={{marginVertical:6, fontSize:22, marginBottom:10}}>About</Text>
								<Text style={{marginBottom:10, lineHeight:26, fontSize:13}}>{venue.description}</Text>

								<DropDown txt1={"Open Today"} txt2={venue.day_schedule} />
								<DropDown2 txt1={venue.address} txt2={""}/>
								<ContactLinks
										handleOnWebsite={()=>{
											if(venue.website && venue.website.length != 0){
												this.setState({url:venue.website},()=>{
													this.toggleModal();
												});
											}
											else {
												this.showToastMessage('Website Unavailable');
											}
										}}
										handleOnCall={()=>{
											if(venue.phone_number && venue.phone_number.length != 0){
												Linking.openURL(`tel:${venue.phone_number}`)
											}
											else {
												this.showToastMessage('Contact Number Unavailable');
											}
										}}
										handleOnBook={()=>{
											if(venue.book_url && venue.book_url.length != 0){
												this.setState({url:venue.book_url},()=>{
													this.toggleModal();
												});
											}
											else {
												this.showToastMessage('Booking Unavailable');
											}
										}}
										handleOnDirection={()=>{
											if(venue.location && venue.location.length != 0){
												this.setState({url:venue.location},()=>{
													this.toggleModal();
												});
											}
											else {
												this.showToastMessage('Location unavailable');
											}
										}} />
							</View>
					</ScrollView>
					<Toast ref="toast"/>

					<Modal
							isVisible={this.state.isModalVisible}
							deviceHeight={height+30}
							style={{marginLeft:0,marginRight:0, marginTop:0,marginBottom:0, height:height+30}}
							onBackdropPress={() => this.setState({isModalVisible: false})}>
			          <View style={{ backgroundColor:'#fff', height:height-100, borderTopLeftRadius: 14, borderTopRightRadius: 14, width:width, position:'absolute', bottom:0,left:0,right:0}}>
			            <TouchableOpacity activeOpacity={0.8} style={{paddingHorizontal:12, paddingVertical:6}} onPress={()=>{ this.toggleModal() }}>
										<Ionicons name="md-close" size={28} color={"#000"} />
									</TouchableOpacity>
									<WebView
											source={{uri: this.state.url}}
						 				 	style={{marginTop: 4}}
											javaScriptEnabled={true}
    									injectedJavaScript={`document.getElementsByClassName('foot-new-pc')[0].style.display = "none"; document.getElementsByClassName('foot-new-mobile')[0].style.display = "none";`}
					 					/>
			          </View>
	        </Modal>
			</View>
    );
  }
}

export default PreviewScreen;
