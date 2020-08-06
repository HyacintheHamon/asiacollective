import React from "react";
import { Text, View,TouchableOpacity, Image,Dimensions, StatusBar, ScrollView } from "react-native";
var {width,height} = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';
import { inject, observer } from 'mobx-react/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';

@inject('userStore')
@observer
export default class DealPreviewScreen extends React.Component {

	constructor(props){
		super();
		this.state = {isModalVisible: false}
	}

	toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };



	_renderItem = ({item, index}) => {
		console.log(item);
		 return (
			 <View style={{width:width, paddingBottom:30, backgroundColor:'#fff'}}>
				 <Image source={{url: item.image}}  style={{height:width, width:width}} resizeMode={'cover'}/>
			</View>
		 );
 }

	render() {
		let { deal } = this.props.navigation.state.params;
		var dealImages = deal.images.split(',').map(function(currentVal){
			return {image: currentVal};
		});
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

				<ScrollView style={{position:'relative', backgroundColor:'#fff'}}>
					<Carousel
							ref={(c) => { this._carousel2 = c; }}
							data={dealImages}
							renderItem={this._renderItem}
							sliderWidth={width}
							itemWidth={width}
						/>
						<View style={{paddingHorizontal:24, paddingBottom:80}}>
							<Text style={{fontSize:20}}>{deal.title.toUpperCase()}</Text>
							<Text style={{color: '#E7B876', marginVertical:4}}>{deal.price}</Text>
							<Text style={{marginTop:14, fontSize:13, lineHeight:24, marginBottom:30}}>{deal.description}</Text>

							<TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.props.navigation.navigate('DealListAllVenues', {deal: deal}) }}>
								<View style={{borderWidth:1, borderColor:'#E7B876', padding:10, alignItems:'center', justifyContent:'center'}}>
									<Text style={{color:'#E7B876'}}>VIEW LIST OF VENUES AND PRIVILEGES</Text>
								</View>
							</TouchableOpacity>
						</View>
				</ScrollView>

				<TouchableOpacity activeOpacity={0.8} style={{position:'absolute', bottom:0, left:0, right:0}} onPress={()=>{ this.toggleModal()  }}>
					<View style={{backgroundColor:'#E7B876', padding:14, alignItems:'center', justifyContent:'center'}}>
						<Text style={{color:'#fff'}}>ADD TO CART</Text>
					</View>
				</TouchableOpacity>

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
										source={{uri: deal.checkout_url }}
					 				 	style={{marginTop: 4}}
				 					/>
		          </View>
        </Modal>
			</View>
		);
	}
}
