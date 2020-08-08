import React from "react";
import { View, Text, Dimensions, FlatList, StatusBar, RefreshControl } from "react-native";

import { inject, observer } from 'mobx-react/native'
import {
	LocationItem,
} from '../../../components/index.js';
var { width } = Dimensions.get('window')
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

class LocationPlaceHolder extends React.PureComponent {
	render(){
		return (<View>
			<Placeholder
				style={{marginBottom:10}}
					Animation={Fade}>
					<PlaceholderMedia isRound={false}
					style={[{  height:150, width:"100%",marginBottom:10	}]}
				/>
			<PlaceholderLine width={50} />
			<PlaceholderLine width={50} />
		</Placeholder>

		<Placeholder
		style={{marginBottom:10}}
			Animation={Fade}>
			<PlaceholderMedia isRound={false}
				style={[{  height:150, width:"100%",marginBottom:10	}]}
		 />
		<PlaceholderLine width={80} />
		<PlaceholderLine width={40} />
	</Placeholder>
			</View>);
	}
}

@inject('userStore')
@observer
class DiscoverScreen extends React.Component {
	constructor(props) {
		 super(props);
		 this.state = {
			 refreshing: false,
			 isLoading:true,
			 locations:[]
		 };
	 }

	 _onRefresh = () => {
		this.setState({refreshing: true});
		this.props.userStore.getLocations((locations)=>{
			this.setState({isLoading: false, refreshing: false, locations:locations});
		});
	}

	componentDidMount(){
		this._onRefresh();
	}


  render() {

    return (
      <View style={{ flex: 1, backgroundColor:'#FFFFFF', paddingLeft:20,paddingRight:20}}>
			<StatusBar backgroundColor="white" barStyle={'dark-content'} />
        <Text style={{marginTop:36, marginBottom:36, fontSize:36}}>VENUES</Text>


			{this.state.isLoading?(<LocationPlaceHolder />):(<FlatList
						 data={this.state.locations}
						 showsHorizontalScrollIndicator={false}
						 showsVerticalScrollIndicator={false}
						 keyExtractor={(item, index) => `loc-${index.toString()}`}
						 refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
						 renderItem={({ item,index })=>{
							 return (<LocationItem
								 title={item.title}
								 key={`loc-${index}`}
								 isPurchased={item.isPurchased}
								 image={item.image}
								 width={width-40}
								 venuesCount={item.venues.length} onPress={()=>{
									 this.props.navigation.navigate(
										 'DiscoverPreview',
										 {selectedLocation: item, title: item.title.toUpperCase()}
									 )
								 }}
							 />);
						 }}/>)}

      </View>
    );
  }
}

export default DiscoverScreen;
