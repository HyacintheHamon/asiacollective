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
	TextInput,
	Keyboard,
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

function groupByFirstTag(array){
	var result = {};
	array.forEach(function(c){
		var tag = c.tags.split(',')[0];
		if(tag){
			if(result.hasOwnProperty(tag)){
				result[tag].push(c);
			}
			else {
				console.log(tag);
				result[tag] = [];
				result[tag].push(c);
			}
		}

	})
	return result;
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
		const paginatedsection5 = groupByFirstTag(this.props.venues);
		return (<ScrollView>

					{Object.keys(paginatedsection5).map((key, i)=>{
						return (<View key={`section-${i}`}>
										{paginatedsection5[key].length != 0 ? (<View style={{flexDirection:'row', justifyContent:'space-between', marginRight:20, paddingVertical:8}}>
											<Text style={{fontSize:18}}>{key}</Text>
											<TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.props.nav.navigate('DiscoveryList', { venues: paginatedsection5[key] }) }}>
												<Text style={{color:'#D5B172', fontSize:12}}>View All</Text>
											</TouchableOpacity>
										</View>) : null}

										{paginatedsection5[key].length != 0 ? (<FlatList
											 data={paginatedsection5[key]}
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
									 />): null}
					 </View>);
					})}


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
		},3000);

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
					 latitude: selectedLocation.coordinates.latitude,
						longitude: selectedLocation.coordinates.longitude,
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
			searchQuery: "",
			typeFilter: [],
			cuisineFilter: [],
			isFilterApplied: false,
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
        style={{backgroundColor:'#fff', elevation:0}}
    />
  )

	renderLabel = ({ route, focused, color }) => {
    return (<Text >
				    {route.title}
				 </Text>)
  }

	addTypeFilter(filter) {
		var { typeFilter } = this.state;
		let indexOfSelected = typeFilter.indexOf(filter);
		var selectedTypeFilters = [];
		if ( indexOfSelected == -1) {
			selectedTypeFilters = typeFilter.concat(filter);
		}
		else {
			let temp = typeFilter.concat();
			temp.splice(indexOfSelected,1);
			selectedTypeFilters = temp;
		}
	  this.setState({typeFilter:  selectedTypeFilters, isFilterApplied:true, isModalVisible:false }, ()=>{

		});
	}

	addCuisineFilter(filter) {
		var { cuisineFilter } = this.state;

		let indexOfSelected = cuisineFilter.indexOf(filter);
		var selectedCuisineFilters = [];
		if ( indexOfSelected == -1) {
			selectedCuisineFilters = cuisineFilter.concat(filter);
		}
		else {
			let temp = cuisineFilter.concat();
			temp.splice(indexOfSelected,1);
			selectedCuisineFilters = temp;
		}
	  this.setState({cuisineFilter:  selectedCuisineFilters, isFilterApplied:true, isModalVisible:false }, ()=>{

		});
	}

	onChangeSearchQuery(searchQuery){
		this.setState({searchQuery: searchQuery });
	}



	onSubmit(){
		Keyboard.dismiss();
		this.setState({ isFilterApplied:true });
		this.handleOnApplyPressed();
	}

	handleOnApplyPressed(){
		var {cuisineFilter,typeFilter} = this.state;
		if(cuisineFilter!= 0 || typeFilter.length != 0){
			this.setState({ isFilterApplied:true });
		}
		else {
			this.setState({ isFilterApplied:false });
		}
		this.toggleModal();
	}

  render() {
		let selectedLocation = this.props.navigation.state.params.selectedLocation;
		var { typeFilter, cuisineFilter, searchQuery } = this.state;
		selectedLocation = Object.assign({},selectedLocation);
		if(searchQuery.length != 0){
				selectedLocation.venues = selectedLocation.venues.filter((currentVal)=>{
					var result = false;
					console.log(searchQuery);
					if(searchQuery.length != 0){
						if(currentVal.name.toLowerCase().indexOf(searchQuery) != -1){
							console.log(currentVal.name.toLowerCase().indexOf(searchQuery));
							result = true;
						}
					}
					else {
						result = true;
					}

					return result;
				});
		}

		if (this.state.isFilterApplied) {
			selectedLocation.venues = selectedLocation.venues.filter((currentVal)=>{
				var result = true;

				if(typeFilter.length != 0){ // if both filters type and cuisine
					typeFilter.forEach((category)=>{
						if(currentVal.category.toLowerCase().indexOf(category) != -1){

							if(cuisineFilter.length!= 0){
								cuisineFilter.forEach((cuisine)=>{
									if(currentVal.cuisine.toLowerCase().indexOf(cuisine) != -1){
										result = true;
									}
									else {
										result = false;
									}
								});
							}
							else {
								result = true;
							}

						}
						else {
							result = false;
						}
					});
				} else { // if cuisine filter only
					if(cuisineFilter.length!= 0){
						if(cuisineFilter.length!= 0){
							cuisineFilter.forEach((cuisine)=>{
								if(currentVal.cuisine.toLowerCase().indexOf(cuisine) != -1){
									result = true;
								}
								else {
									result = false;
								}
							});
						}
					}
				}



				if(typeFilter.length == 0 && cuisineFilter.length == 0 ){
					result=true;
				}
				return result;
			});
		}
		//filter over here hahahaa
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
							<TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.handleOnApplyPressed() }} style={{position:'absolute', left:0}}>
								<View style={{paddingVertical:18, paddingHorizontal:18}}>
									<Ionicons name="md-close" size={30} color={"#000"} />
								</View>
							</TouchableOpacity>
							<Text style={{ fontSize:16, alignSelf:'center'}}>FILTER</Text>

							<TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.setState({searchQuery:"", typeFilter: [],cuisineFilter:[]}); this.toggleModal() }} style={{position:'absolute', right:0, top:6}}>
								<Text style={{ fontSize:14, paddingVertical:20, paddingHorizontal:18, color:'#D5B172'}}>CLEAR</Text>
							</TouchableOpacity>
						</View>

						<View style={{marginVertical:1, marginLeft:20}}>
							<View>
								<TextInput
									autoCapitalize={false}
									autoCompleteType={"off"}
									clearButtonMode={true}
									placeholder={"Search"}
									autoCorrect={false}
									onSubmitEditing={this.onSubmit.bind(this)}
							    style={{ height: 40, width:width-40, borderColor: '#f0f0f0', borderWidth: 1, marginBottom:14, backgroundColor:"#f0f0f0", paddingHorizontal:10, borderRadius:8, paddingLeft:40 }}
							    onChangeText={(searchQuery) => { this.onChangeSearchQuery(searchQuery) }}
							    value={this.state.searchQuery}
								/>
								<Ionicons name="ios-search-outline" size={24} color="gray" style={{position:'absolute', left: 10, top: 6}}/>
							</View>

							<Text style={{fontSize:20, marginBottom:16}}>Category</Text>
							<ScrollView horizontal={true} contentStyle={{flexDirection:'row'}} style={{paddingBottom:34}} showsHorizontalScrollIndicator={false}>
								<TouchableOpacity onPress={()=>{ this.addTypeFilter('restaurant') }} activeOpacity={0.8}>
									<View style={{width:80, opacity: typeFilter.indexOf('restaurant') == -1 ? 1 : 0.4}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<Ionicons name={"ios-restaurant"} size={26} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Restaurant</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity onPress={()=>{ this.addTypeFilter('cafe') }} activeOpacity={0.8}>
									<View style={{width:80, opacity: typeFilter.indexOf('cafe') == -1 ? 1 : 0.4}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<SimpleLineIcons name={"cup"} size={22} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Cafe</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity onPress={()=>{ this.addTypeFilter('bar') }} activeOpacity={0.8}>
									<View style={{width:80, opacity: typeFilter.indexOf('bar') == -1 ? 1 : 0.4}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<Ionicons name={"ios-wine"} size={26} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Bar</Text>
									</View>
								</TouchableOpacity>
								{/*<TouchableOpacity onPress={()=>{ this.addTypeFilter('beach club') }} activeOpacity={0.8}>
									<View style={{width:80, opacity: typeFilter.indexOf('beach club') == -1 ? 1 : 0.4}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<FontAwesome5 name={"umbrella-beach"} size={22} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Beach Club</Text>
									</View>
								</TouchableOpacity> */}
								{/*<TouchableOpacity onPress={()=>{ this.addTypeFilter('spa') }} activeOpacity={0.8}>
									<View style={{width:80, opacity: typeFilter.indexOf('spa') == -1 ? 1 : 0.4}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<MaterialIcons name={"spa"} size={26} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Spa</Text>
									</View>
								</TouchableOpacity>*/}
								{/*<TouchableOpacity onPress={()=>{ this.addTypeFilter('hotel') }} activeOpacity={0.8}>
									<View style={{width:80, opacity: typeFilter.indexOf('hotel') == -1 ? 1 : 0.4}}>
										<View style={{alignSelf:'center', borderRadius:26, width:52, height:52, borderWidth:1, borderColor:"#E7B876", alignItems:'center', justifyContent:'center'}}>
											<MaterialCommunityIcons name={"hotel"} size={26} color={"#E7B876"}  />
										</View>
										<Text style={{ width:80, textAlign:'center', fontSize:12, color:"#E7B876"}}>Hotel</Text>
									</View>
								</TouchableOpacity>*/}

							</ScrollView>

								<Text style={{fontSize:20, marginBottom:16}}>Cuisine</Text>
								<ScrollView vertical={true}>
									<TouchableOpacity onPress={()=>{ this.addCuisineFilter('asian') }} activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, color: cuisineFilter.indexOf('asian') == -1 ? 'black' : 'gray', fontSize:16}}>Asian</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>{ this.addCuisineFilter('australian') }} activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, color: cuisineFilter.indexOf('australian') == -1 ? 'black' : 'gray', fontSize:16}}>Australian</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>{ this.addCuisineFilter('chinese') }} activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, color: cuisineFilter.indexOf('chinese') == -1 ? 'black' : 'gray', fontSize:16}}>Chinese</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>{ this.addCuisineFilter('japanese') }} activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, color: cuisineFilter.indexOf('japanese') == -1 ? 'black' : 'gray', fontSize:16}}>Japanese</Text>
									</TouchableOpacity>
									{/*<TouchableOpacity onPress={()=>{ this.addCuisineFilter('greek') }} activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, color: cuisineFilter.indexOf('greek') == -1 ? 'black' : 'gray', fontSize:16}}>Greek</Text>
									</TouchableOpacity>*/}
									<TouchableOpacity onPress={()=>{ this.addCuisineFilter('italian') }} activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, color: cuisineFilter.indexOf('italian') == -1 ? 'black' : 'gray', fontSize:16}}>Italian</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>{ this.addCuisineFilter('south american') }} activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, color: cuisineFilter.indexOf('south american') == -1 ? 'black' : 'gray', fontSize:16}}>South American</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>{ this.addCuisineFilter('middle eastern') }} activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, color: cuisineFilter.indexOf('middle eastern') == -1 ? 'black' : 'gray', fontSize:16}}>Middle Eastern</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>{ this.addCuisineFilter('western, asian fusion') }} activeOpacity={0.8} style={{marginLeft:4,marginBottom:10}}>
										<Text style={{paddingVertical:10, color: cuisineFilter.indexOf('western, asian fusion') == -1 ? 'black' : 'gray', fontSize:16}}>Western, Asian Fusion</Text>
									</TouchableOpacity>
								</ScrollView>

						</View>




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
