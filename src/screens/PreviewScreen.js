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
import {openSettings,request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNPickerSelect from 'react-native-picker-select';


const pickerStyle = {
	inputIOS: {
		width:150,
		height:40,
		textAlign:'center',
		backgroundColor:'#b39364',
		paddingVertical:8,
		color:'#FFF',
		fontSize:14,
	},
	inputAndroid: {
		width:150,
		height:40,
		textAlign:'center',
		backgroundColor:'#b39364',
		paddingVertical:8,
		color:'#FFF',
		fontSize:14,
	}
};
const placeholder = {
	label: 'Choose Unique Code',
	color: '#000',
	fontSize:10,
}


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
			isSignedIn: false,
			isModalVisible: false,
			isFetchingOffers: true,
			offers: [],
			isDisableAll: true,
			displayBookCode: null,
			availableBookCodes: [],
			deal_checkout_url: null,
			deal_description_url: null,
			isBuyPrivilegeModalVisible: false,

			redeemSuccessModal: false,
			redeemErrorModal: false
		}
	}

	async componentDidMount(){
		const { venue } = this.props.navigation.state.params;
		const loc = venue.venue_local_id.split('_')[0];

		this.reloadPrivilege();

		this.props.userStore.isSignedIn((isSignedIn)=>{
			if(isSignedIn){
				this.setState({isSignedIn: true});
			}
		});

		this.props.userStore.getCheckoutUrl(loc,(urls)=>{
			this.setState({
				deal_checkout_url: urls.checkout_url,
				deal_description_url: urls.checkout_url_description
			 });
		});

	}

	reloadPrivilege(){
		let { venue } = this.props.navigation.state.params;
		this.setState({isFetchingOffers: true, displayBookCode: null });
		this.props.userStore.getOffer(venue.id, async (offers)=>{
			this.setState({ isFetchingOffers: false, offers: offers });

			var books = await this.props.userStore.getBooks();
			var availableBookCodes = [];
			console.log(books,'books books', offers, venue);
			if(books && books.length){
				books.forEach((book)=>{
					if(venue.user_id == book.fk_user_id){
						if(book.redeem_status == 0 || book.redeem_status == "0"){
							availableBookCodes.push( book.book_number );
							this.setState({isDisableAll: false });
						}
					}
				});
			}

			this.setState({ availableBookCodes: availableBookCodes });
			if(availableBookCodes.length == 1){
				this.setState({ displayBookCode: availableBookCodes[0] });
			}

		});
	}

	toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});





		setTimeout(() => {
			if(this.webref) {
				this.webref.injectJavaScript(`
					jQuery(document).ready(function(){
						document.getElementsByClassName('foot-new-pc')[0].style.display = "none";
						document.getElementsByClassName('foot-new-mobile')[0].style.display = "none";
					});
					setInterval(function(){
						document.getElementsByClassName('foot-new-pc')[0].style.display = "none";
						document.getElementsByClassName('foot-new-mobile')[0].style.display = "none";
					},5000);
					`);
				}
			}, 1000);

  };

	async checkPermissionCamera() {
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,{
						title: 'AsiaCollective Camera Permission',
						message:'AsiaCollective needs your permission for your camera to utilize conference feature.'
					}
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					return true;
				} else {
					Alert.alert('Permission Error', 'Permission denied. Please try again');
					return false;
				}
			} catch (err) {
				console.warn(err);
				return false;
			}
		}

		async checkPermissionIOS(){
			return new Promise((resolve,reject)=> {
				check(PERMISSIONS.IOS.CAMERA).then((result) => {
				    switch (result) {
				      case RESULTS.UNAVAILABLE:
								request(PERMISSIONS.IOS.CAMERA).then((result) => {

								});
				        console.log('This feature is not available (on this device / in this context)');
								resolve(false);
				        break;
				      case RESULTS.DENIED:
								request(PERMISSIONS.IOS.CAMERA).then((result) => {

								});
				        console.log('The permission has not been requested / is denied but requestable');
								resolve(false);
				        break;
				      case RESULTS.GRANTED:
				        console.log('The permission is granted');
								resolve(true);
				        break;
				      case RESULTS.BLOCKED:
								openSettings().catch(() => console.warn('cannot open settings'));
				        console.log('The permission is denied and not requestable anymore');
								resolve(false);
				        break;
				    }
				  })
				  .catch((error) => {
				    // …
						console.log(error);
						resolve(false);
				  });
			})
		}

		async handleOnClick(){
			const { displayBookCode } = this.state;
			if(!displayBookCode || displayBookCode.length == 0){
				this.showToastMessage('Please select a book');
				return;
			}

			if (Platform.OS == 'android') {
					const permission = await this.checkPermissionCamera();
					if (!permission) {
						return;
					}
					else {
						this.props.navigation.navigate('ScanScreen', { handleOnBarCodeReceived: this.handleOnBarCodeReceived.bind(this) })
					}
			}
			else {
				this.checkPermissionIOS().then((isAllowed)=>{
					if(isAllowed==true){
						this.props.navigation.navigate('ScanScreen', { handleOnBarCodeReceived: this.handleOnBarCodeReceived.bind(this) })
					}
				});
			}

		}


	handleOnBarCodeReceived(event) {
		//Toast.show('Type: ' + event.type + '\nData: ' + event.data);
		const { displayBookCode } = this.state;
		if(!displayBookCode || displayBookCode.length == 0){
			this.showToastMessage('Please select a book & scan again');
			return;
		}

		this.props.userStore.checkVenueQr({code:event.data, book_number: displayBookCode}, (isValid)=>{
			if(isValid){
				this.setState({redeemSuccessModal: true });
				// Alert.alert(
				// 	"Success",
				// 	"Your privilege can now be redeemed.",
				// 	[{ text: "OK", onPress: () => {
				// 			if(this.reloadPrivilege){
				// 				this.reloadPrivilege();
				// 			}
				// 			console.log("OK Pressed")
				// 		} }],
				// 	{ cancelable: true }
				// );
			}
			else {
				this.setState({redeemErrorModal: true });
				// Alert.alert(
				// 	"Error",
				// 	"Privilege redemption failed",
				// 	[{ text: "CANCEL", onPress: () => {
				// 			if(this.reloadPrivilege){
				// 				this.reloadPrivilege();
				// 			}
				// 			console.log("cancel Pressed")
				// 		} }],
				// 	{ cancelable: true }
				// );
			}
		});
	};

	renderOffer(offer, i){
		let { displayBookCode } = this.state;
		return (<View key={`offer-${i}`} style={{marginVertical:10, marginBottom: 10, borderStyle: 'dashed', borderRadius: 1, borderColor:'#E7B876', borderWidth:2, padding:12, paddingBottom:60, position:'relative'}}>
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
			<View style={{flexDirection:'row', position:'absolute', bottom: -2, left:-2, right:-2, backgroundColor:'#b39364'}}>
				{this.state.isDisableAll || this.state.availableBookCodes.length == 0 ? (<TouchableOpacity
						onPress={()=>{
							if(this.state.availableBookCodes.length == 0){
								// login here
								this.setState({isBuyPrivilegeModalVisible:true});

								// if(this.state.deal_checkout_url && this.state.deal_checkout_url.length){
								// 	this.setState({url:this.state.deal_checkout_url},()=>{
								// 		this.toggleModal();
								// 	});
								// }
							}
							else {
								this.showToastMessage('Redeem Error');
							}
						}}
						activeOpacity={0.8} style={{}}>
					<View style={{ height:40, backgroundColor: 'gray', width:(width-48), alignItems:'center', justifyContent:'center'}}>
						<Text style={{color:'#fff'}}>Buy Privilege</Text>
					</View>
				</TouchableOpacity>): (<TouchableOpacity
				onPress={()=>{ this.handleOnClick() }}
						activeOpacity={0.8} style={{}}>
					<View style={{ height:40, backgroundColor: '#E7B876', width:(width-48)-150, alignItems:'center', justifyContent:'center'}}>
						<Text style={{color:'#fff'}}>Redeem Privilege</Text>
					</View>
				</TouchableOpacity>)}
				{ !this.state.isDisableAll && this.state.availableBookCodes.length != 0 ? (<RNPickerSelect
					style={pickerStyle}
					placeholder={Object.assign(placeholder)}
					value={this.state.availableBookCodes.length == 1 ? this.state.availableBookCodes[0] : (this.state.displayBookCode ? this.state.displayBookCode : null)  }
					onValueChange={(value) => this.setState({ displayBookCode:value })}
					items={this.state.availableBookCodes.map((c)=>{
						 return { label: c, value: c };
					 })}
				 />) : null }
			</View>
			</View>);

	}

	renderSuccessModal(){
		const dateNow = new Date().toDateString();
		return (<View style={{ height:300, borderRadius:10, padding:20, backgroundColor:'#fff' }}>
		<EvilIcons name={"check"} size={150} color={"green"} style={{alignSelf:'center'}} />
			<Text style={{fontSize:24, marginTop:20, textAlign:'center', color:'green', fontWeight:'bold'}}>Success</Text>
			<Text style={{fontSize:18, marginTop:4, textAlign:'center'}}>Your privilege can now be redeemed</Text>
			<Text style={{fontSize:18, marginTop:4, textAlign:'center'}}>{dateNow}</Text>
			<TouchableOpacity onPress={()=>{ this.handleCloseSuccessAndRedeeemModal() }} style={{position:'absolute', bottom:0, left:0, right:0,}}>
				<View style={{ alignItems:'center', justifyContent:'center', backgroundColor:'transparent', padding:20}}>
					<Text style={{fontSize:16}}>OK</Text>
				</View>
			</TouchableOpacity>
		</View>);
	}

	renderErrorModal(){
		return (<View style={{ height:300, borderRadius:10, padding:20, backgroundColor:'#fff' }}>
		<EvilIcons name={"close-o"} size={150} color={"red"} style={{alignSelf:'center'}} />
			<Text style={{fontSize:24, marginTop:20, textAlign:'center', color:'red', fontWeight:'bold'}}>Error</Text>
			<Text style={{fontSize:18, marginTop:4, textAlign:'center'}}>Privilege redemption failed</Text>
			<TouchableOpacity onPress={()=>{ this.handleCloseSuccessAndRedeeemModal() }} style={{position:'absolute', bottom:0, left:0, right:0,}}>
				<View style={{ alignItems:'center', justifyContent:'center', backgroundColor:'transparent', padding:20}}>
					<Text style={{fontSize:16}}>OK</Text>
				</View>
			</TouchableOpacity>
		</View>);
	}

	handleCloseSuccessAndRedeeemModal () {
		this.reloadPrivilege();
		this.setState({ redeemErrorModal: false, redeemSuccessModal: false });
	}

	showToastMessage(message){
		this.refs.toast.show(message, 500, () => {

		});
	}

	render() {
		let {venue} = this.props.navigation.state.params;
		let { offers, isFetchingOffers, deal_checkout_url } = this.state;
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

								{isFetchingOffers ? (<ActivityIndicator size="small" color="#000" />) : offers.map((offer,i)=>{
									return this.renderOffer(offer, i)
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
											ref={(r) => (this.webref = r)}
    									injectedJavaScript={`document.getElementsByClassName('foot-new-pc')[0].style.display = "none"; document.getElementsByClassName('foot-new-mobile')[0].style.display = "none";`}
					 					/>
			          </View>
	        </Modal>

					<Modal isVisible={this.state.redeemSuccessModal || this.state.redeemErrorModal}>
		        {this.state.redeemSuccessModal ? this.renderSuccessModal() : null}
						{this.state.redeemErrorModal ? this.renderErrorModal() : null}
		      </Modal>

					<Modal
							isVisible={this.state.isBuyPrivilegeModalVisible}
							deviceHeight={height+30}
							style={{marginLeft:0,marginRight:0, marginTop:0,marginBottom:0, height:height+30}}
							onBackdropPress={() => this.setState({isBuyPrivilegeModalVisible: false})}>
			          <View style={{ backgroundColor:'#fff', height:height-100, borderTopLeftRadius: 14, borderTopRightRadius: 14, width:width, position:'absolute', bottom:0,left:0,right:0}}>
			            <TouchableOpacity activeOpacity={0.8} style={{paddingHorizontal:12, paddingVertical:6}} onPress={()=>{ this.setState({isBuyPrivilegeModalVisible:false}) }}>
										<Ionicons name="md-close" size={28} color={"#000"} />
									</TouchableOpacity>
									<View style={{backgroundColor:'#fff', height:170, alignItems:'center', justifyContent:'center'}}>
										{!this.state.isSignedIn? (<View>
											<Text style={{textAlign:'center', marginBottom: 5, marginLeft: 10, fontSize:11}}>Not logged in yet?</Text>

												<TouchableOpacity onPress={()=>{
												this.setState({isBuyPrivilegeModalVisible: false}, ()=>{
													this.props.navigation.goBack();
													setTimeout(()=>{
														this.props.navigation.dangerouslyGetParent().navigate('Account')
													},600);
												});
											}}>
												<View style={{ flexDirection:"row", height:40, backgroundColor: '#D8B06C', width:(width-48), alignItems:'center', justifyContent:'center'}}>
												<Ionicons name="ios-mail" size={22} color={"#fff"} />
												<Text style={{color:"#fff", marginLeft:10}}>Sign In with Email</Text>
												</View>
												</TouchableOpacity>

											</View>): null }

											<Text style={{paddingHorizontal:6, marginTop:5, marginBottom:5, textAlign:'center'}}>Or</Text>

											<TouchableOpacity onPress={()=>{
												if(this.state.deal_checkout_url && this.state.deal_checkout_url.length){
													this.setState({isBuyPrivilegeModalVisible: false});
													setTimeout(()=>{
														this.setState({url:this.state.deal_checkout_url},()=>{
															this.toggleModal();
														});
													},1000);
												}
											}}>
												<View style={{ height:40, backgroundColor: 'gray', width:(width-48), alignItems:'center', justifyContent:'center'}}>
													<Text style={{color:'#fff'}}>Buy Privilege</Text>
												</View>
												</TouchableOpacity>
											<Text style={{color:"000", marginTop:15, marginBottom:15, fontStyle:'italic'}}>Checkout our list of privileges below:</Text>
									</View>

									<WebView
											source={{uri: this.state.deal_description_url}}
						 				 	style={{marginTop: 4, backgroundColor:'#000'}}
											javaScriptEnabled={true}
											ref={(r) => (this.webref = r)}

					 					/>
			          </View>
	        </Modal>

			</View>
    );
  }
}

export default PreviewScreen;
