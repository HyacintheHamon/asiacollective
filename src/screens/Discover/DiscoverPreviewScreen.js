import React from "react";
import { View,
	Text,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	StatusBar,TouchableOpacity,
	FlatList,
	ActivityIndicator,
	Platform
} from "react-native";

import { inject, observer } from 'mobx-react/native';
import {
	LocationVenueItem,
} from '../../../components/index.js';
var { width } = Dimensions.get('window')
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Modal from 'react-native-modal';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';


var {width,height} = Dimensions.get('window');

function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

class FooterPreview extends React.PureComponent {
		render(){
			let data = this.props.data;
			return (<View style={styles.itemPreview}>
					<TouchableOpacity style={{flex:1}} onPress={this.props.onPress}>
						<View>
							<Text style={styles.footerPreviewTitle}>{data.title}</Text>
							<Text style={styles.footerPreviewSubtitle}>{data.category}</Text>
						</View>
					</TouchableOpacity>
					<Image source={{uri:data.image}} resizeMode={"cover"} style={{width:70, height:70}}/>
				</View>);
		}
}


class FirstRoute extends React.Component {
	constructor(props){
		super();
		this.state = {
			isRenderList:false
		}
	}


	componentDidMount(){
		setTimeout(()=>{ this.setState({isRenderList:true}) },2000);
	}

	renderList(){
		return (<ScrollView>

						<View style={{flexDirection:'row', justifyContent:'space-between', marginRight:20, paddingVertical:8}}>
							<Text style={{fontSize:18}}>DOWNTOWN</Text>
							<TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.props.nav.navigate('DiscoveryList', { venues: this.props.venues }) }}>
								<Text style={{color:'orange', fontSize:12}}>View All</Text>
							</TouchableOpacity>
						</View>
						<FlatList
							 data={paginate(this.props.venues, this.props.venues.length/4, 1) }
							 horizontal={true}
							 showsHorizontalScrollIndicator={false}
							 renderItem={({ item })=>{
								 return (<LocationVenueItem
									 title={item.title}
									 image={item.image}
									 tags={item.tags}
									 thumbnailStyle={{marginRight:20}}
									 onPress={()=>{ this.props.nav.navigate('Preview', {venue: item})}}/>);
							 }}
							 keyExtractor={(item, index) => `locVenue-${index.toString()}`}
					 />
					 <View style={{flexDirection:'row', justifyContent:'space-between', marginRight:20, paddingVertical:8}}>
						 <Text style={{fontSize:18}}></Text>
						 <TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.props.nav.navigate('DiscoveryList', { venues: this.props.venues }) }}>
							 <Text style={{color:'orange', fontSize:12}}>View All</Text>
						 </TouchableOpacity>
					 </View>
					 <FlatList
							data={paginate(this.props.venues, this.props.venues.length/4, 2) }
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							renderItem={({ item })=>{
								return (<LocationVenueItem
									title={item.title}
									image={item.image}
									tags={item.tags}
									thumbnailStyle={{marginRight:20}}
									onPress={()=>{ this.props.nav.navigate('Preview', {venue: item})}}/>);
							}}
							keyExtractor={(item, index) => `locVenue2-${index.toString()}`}
					/>

					<View style={{flexDirection:'row', justifyContent:'space-between', marginRight:20, paddingVertical:8}}>
						<Text style={{fontSize:18}}></Text>
						<TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.props.nav.navigate('DiscoveryList', { venues: this.props.venues }) }}>
							<Text style={{color:'orange', fontSize:12}}>View All</Text>
						</TouchableOpacity>
					</View>
					<FlatList
						 data={paginate(this.props.venues, this.props.venues.length/4, 3) }
						 horizontal={true}
						 showsHorizontalScrollIndicator={false}
						 renderItem={({ item })=>{
							 return (<LocationVenueItem
								 title={item.title}
								 image={item.image}
								 tags={item.tags}
								 thumbnailStyle={{marginRight:20}}
								 onPress={()=>{ this.props.nav.navigate('Preview', {venue: item})}}/>);
						 }}
						 keyExtractor={(item, index) => `locVenue3-${index.toString()}`}
				 />

				 <View style={{flexDirection:'row', justifyContent:'space-between', marginRight:20, paddingVertical:8}}>
					 <Text style={{fontSize:18}}></Text>
					 <TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.props.nav.navigate('DiscoveryList', { venues: this.props.venues }) }}>
						 <Text style={{color:'orange', fontSize:12}}>View All</Text>
					 </TouchableOpacity>
				 </View>
				 <FlatList
						data={paginate(this.props.venues, this.props.venues.length/4, 4) }
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item })=>{
							return (<LocationVenueItem
								title={item.title}
								image={item.image}
								tags={item.tags}
								thumbnailStyle={{marginRight:20}}
								onPress={()=>{ this.props.nav.navigate('Preview', {venue: item})}}/>);
						}}
						keyExtractor={(item, index) => `locVenue4-${index.toString()}`}
				/>

		</ScrollView>);
	}

	render(){
		return (<View style={[styles.scene, { backgroundColor: '#fff', paddingTop:20, paddingLeft:20 }]}>
			<StatusBar backgroundColor="white" barStyle={'dark-content'} />

			{ !this.state.isRenderList ? (<ActivityIndicator style={{position:'absolute', left:'50%', top:"50%"}} size="small" color="#000" />) : null }
			{ this.state.isRenderList ? this.renderList() : null }

		</View>);
	}
};

class SecondRoute extends React.Component {
	constructor(props){
		super(props);
		this.state = {
	    isRenderMap: false,
			selectedItem: null,
			currentLat: null,
			currentLong: null,
			hasCurrentLocation: null,
	  }
	}

	componentDidMount(){
		//var selectedLocation = this.props.navigation.state.params.selectedLocation;
		var selectedLocation = this.props.selectedLocation;
		setTimeout(()=>{
			this.setState({
				isRenderMap:true,
				currentLat: selectedLocation.coordinates.latitude,
				currentLong: selectedLocation.coordinates.longitude
			})
		},5000);

	}

	handleOnLocateCurrentPosition(){
		Geolocation.requestAuthorization();
		var clearTimer = setInterval(()=>{
			Geolocation.getCurrentPosition((geoData)=>{
				clearInterval(clearTimer);
				console.log(geoData);
				this.setState({
					hasCurrentLocation: true,
					currentLat: geoData.coords.latitude,
					currentLong: geoData.coords.longitude
				});
			},null,null);
		},2000);
	}

	handleOnPress(selectedItem){
		this.setState({selectedItem:selectedItem});
	}

	renderMap(selectedLocation){
		var { currentLat, currentLong } = this.state;
		var response;
		if(Platform.OS == "android"){
			response = (<MapView
				provider={PROVIDER_GOOGLE}
					style={styles.map}
				 initialRegion={{
					 latitude: 37.78825,
					 longitude: -122.4324,
					 latitudeDelta: 0.0922,
					 longitudeDelta: 0.0421,
				 }}>
				 {this.state.selectedItem != null ? (<MapViewDirections
						origin={{
							latitude: currentLat,
							longitude: currentLong
					}}
					apikey={"AIzaSyB8YuB_4QzGw1XTb5SubcqorkcgauohlKU"}
						destination={this.state.selectedItem.coordinates}
					/>) : null }

					{selectedLocation.venues.map((marker,i)=>{
					 return (<Marker
						 key={"i-"+i}
						 coordinate={marker.coordinates}
						 title={marker.title}
						 description={marker.address}
						 tracksViewChanges={false}
						 onPress={()=>{
							 this.handleOnPress(marker)
						 }}
					 />);
				 })}
				 </MapView>)
		}
		else {
			response = (<MapView
					style={StyleSheet.absoluteFillObject}
				 initialRegion={{
					 latitude: selectedLocation.coordinates.latitude,
					 longitude: selectedLocation.coordinates.longitude,
					 latitudeDelta: 0.0922,
					 longitudeDelta: 0.0421,
				 }}
			 >
			 				{this.state.selectedItem != null ? (<MapViewDirections
									origin={{
										latitude: currentLat,
										longitude: currentLong
								}}
								apikey={"AIzaSyB8YuB_4QzGw1XTb5SubcqorkcgauohlKU"}
									destination={this.state.selectedItem.coordinates}
								/>) : null }

					    {selectedLocation.venues.map((marker,i)=>{
								return (<Marker
									key={"i-"+i}
						      coordinate={marker.coordinates}
						      title={marker.title}
						      description={marker.address}
									tracksViewChanges={false}
									onPress={()=>{
										this.handleOnPress(marker)
									}}
						    />);
							})}


			 </MapView>)
		}
		return response;
	}

  render() {
		console.log('maps maps maps',this.props);
    return (
			<View style={[styles.scene, { backgroundColor: '#fff' }]}>
					<View style={styles.container}>
					{ !this.state.isRenderMap ? (<ActivityIndicator style={{position:'absolute', left:'50%', top:"50%"}} size="small" color="#000" />) : null }
					{ this.state.isRenderMap ? this.renderMap(this.props.selectedLocation) : null }

					{ this.state.isRenderMap ? (<TouchableOpacity activeOpacity={0.8} style={{position:'absolute', right:10, top:10}} onPress={()=>{ this.handleOnLocateCurrentPosition() }}>
						<View style={{width:80}}>
							<View style={{alignSelf:'center', borderRadius:29, width:58, height:58, borderWidth:1, backgroundColor: this.state.hasCurrentLocation ? '#000' : "#fff", borderColor:"#fff", alignItems:'center', justifyContent:'center'}}>
								<MaterialIcons name={"my-location"} size={26} color={this.state.hasCurrentLocation ? "#FFF" : "#000"}  />
							</View>
						</View>
					</TouchableOpacity>) : null }
					{this.state.selectedItem != null ? (<FooterPreview onPress={()=>{   this.props.nav.navigate('Preview', {venue: this.state.selectedItem}) }} data={this.state.selectedItem} />) : null }
					</View>
			</View>
    );
  }

	// render(){
	// 	return (
	// 		<View style={[styles.scene, { backgroundColor: '#fff' }]}>
	// 		</View>
	// 	);
	//}
}

@inject('userStore')
@observer
class DiscoverPreview extends React.Component {
	constructor(props){
		super();
		this.state = {
	    index: 0,
	    routes: [
	      { key: 'first', title: 'Restaurants' },
	      { key: 'second', title: 'Map' },
	    ],
			venues:[],
			isModalVisible: false
	  }
	}

	toggleModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible});
	};

	componentDidMount(){
		// this.props.userStore.getVenues((venues)=>{
		// 	this.setState({ venues: venues });
		// })
	}

  renderTabBar = (props) => (
    <TabBar
        {...props}
        indicatorStyle={{backgroundColor:'#E7B876'}}
				renderLabel={this.renderLabel}
        tabStyle={styles.tabStyle}
        style={{backgroundColor:'#fff'}}
    />
  )

	renderLabel = ({ route, focused, color }) => {
    return (<Text >
				    {route.title}
				 </Text>)
  }


  render() {
		let selectedLocation = this.props.navigation.state.params.selectedLocation;
    return (
			<View style={{paddingTop:20, flex:1, backgroundColor:'#fff'}}>
					<StatusBar backgroundColor="white" barStyle={'dark-content'} />
					<Text style={{marginBottom: 20, marginTop:20, fontSize:30, marginLeft:20}}>{selectedLocation.title}</Text>
					<TouchableOpacity activeOpacity={0.8} style={{position:'absolute', right:20, top:40}} onPress={()=>{ this.toggleModal() }}>
						<Ionicons name="ios-options" size={30} color="gray"/>
					</TouchableOpacity>
					<TabView
					 navigationState={this.state}
					 swipeEnabled={false}
					 renderTabBar={this.renderTabBar}
					 renderScene={SceneMap({
						 first: ()=>{
							return (<FirstRoute  venues={selectedLocation.venues} nav={this.props.navigation} />)
						 },
						 second: ()=>{
							 return (<SecondRoute selectedLocation={selectedLocation} venues={selectedLocation.venues} nav={this.props.navigation} />)
						 }
					 })}
					 onIndexChange={index => this.setState({ index })}
					 initialLayout={{ width: Dimensions.get('window').width }}
				 />

				 <Modal
 						isVisible={this.state.isModalVisible}
						deviceHeight={height+30}
						style={{marginLeft:0,marginRight:0, marginTop:0,marginBottom:0, height:height+30}}
						>
           <View style={{ backgroundColor:'#fff', height:height, width:width}}>

						<View style={{position:'relative',  marginTop:20, paddingVertical:24, }}>
							<TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.toggleModal() }} style={{position:'absolute', left:0}}>
								<View style={{paddingVertical:18, paddingHorizontal:18}}>
									<Ionicons name="md-close" size={30} color={"#000"} />
								</View>
							</TouchableOpacity>
							<Text style={{ fontSize:16, alignSelf:'center'}}>FILTER</Text>

							<TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.toggleModal() }} style={{position:'absolute', right:0, top:6}}>
								<Text style={{ fontSize:14, paddingVertical:20, paddingHorizontal:18, color:'orange'}}>CLEAR</Text>
							</TouchableOpacity>
						</View>

						<View style={{marginVertical:4, marginLeft:20}}>
							<Text style={{fontSize:20, marginBottom:16}}>Category</Text>
							<ScrollView horizontal={true} contentStyle={{flexDirection:'row'}} style={{paddingBottom:34}} showsHorizontalScrollIndicator={false}>
								<TouchableOpacity activeOpacity={0.8}>
									<View style={{width:80}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<Ionicons name={"ios-restaurant"} size={26} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Restaurant</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}>
									<View style={{width:80}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<SimpleLineIcons name={"cup"} size={22} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Cafe</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}>
									<View style={{width:80}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<Ionicons name={"ios-wine"} size={26} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Bar</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}>
									<View style={{width:80}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<FontAwesome5 name={"umbrella-beach"} size={22} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Beach Club</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}>
									<View style={{width:80}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<MaterialIcons name={"spa"} size={26} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Spa</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity activeOpacity={0.8}>
									<View style={{width:80}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<MaterialCommunityIcons name={"hotel"} size={26} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Hotel</Text>
									</View>
								</TouchableOpacity>

							</ScrollView>

								<Text style={{fontSize:20, marginBottom:16}}>Cuisine</Text>
								<ScrollView vertical={true}>
									<TouchableOpacity activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, fontSize:16}}>Asian</Text>
									</TouchableOpacity>
									<TouchableOpacity activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, fontSize:16}}>Australian</Text>
									</TouchableOpacity>
									<TouchableOpacity activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, fontSize:16}}>Chinese</Text>
									</TouchableOpacity>
									<TouchableOpacity activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, fontSize:16}}>Japanese</Text>
									</TouchableOpacity>
									<TouchableOpacity activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, fontSize:16}}>Greek</Text>
									</TouchableOpacity>
									<TouchableOpacity activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, fontSize:16}}>Italian</Text>
									</TouchableOpacity>
									<TouchableOpacity activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, fontSize:16}}>South American</Text>
									</TouchableOpacity>
									<TouchableOpacity activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, fontSize:16}}>Middle Eastern</Text>
									</TouchableOpacity>
									<TouchableOpacity activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, fontSize:16}}>Western, Asian Fusion</Text>
									</TouchableOpacity>
								</ScrollView>

						</View>


						<TouchableOpacity activeOpacity={0.8} style={{position:'absolute', bottom:20, left:0, right:0}} onPress={()=>{   }}>
							<View style={{backgroundColor:'#E7B876', padding:14, alignItems:'center', justifyContent:'center'}}>
								<Text style={{color:'#fff'}}>APPLY</Text>
							</View>
						</TouchableOpacity>

           </View>
         </Modal>
			</View>
    );
  }
}


const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
	container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

	itemPreview: {
		backgroundColor:'#fff',
		position:'absolute',
		left:0,
		right:0,
		bottom:0,
		height:100,
		padding:15,
		flexDirection:'row'
	},
	footerPreviewTitle: {
		fontSize:18,
		marginBottom:8
	},
	footerPreviewSubtitle: {
		fontSize:13,
		color: "gray"
	}
});


export default DiscoverPreview;
