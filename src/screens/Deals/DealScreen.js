import React from "react";
import { Text, View,TouchableOpacity, Image,Dimensions, StatusBar } from "react-native";
var {width,height} = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';
import { inject, observer } from 'mobx-react/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

@inject('userStore')
@observer
export default class DealScreen extends React.Component {
	constructor(props){
		super();
		this.state = {
			deals:[]
		}
	}

		componentDidMount(){
			this.props.userStore.getDeals((deals)=>{
        this.props.userStore.getVenues((venues) => {

            deals = deals.map(function(currentVal){
              currentVal["venue"] = currentVal["venue"].map(function(currentVenue){
                let foundVenue = venues.find(function(venue){
                  return currentVenue.venue_id == venue.id;
                });

                let v = Object.assign({}, currentVenue, foundVenue, foundVenue.scrapped, foundVenue.remote_db);
                delete v.scrapped;
                delete v.remote_db;
                return v;
              });
              return currentVal;
            });

            this.setState({ deals: deals });
        });

			})
		}

	_renderItem = ({item, index}) => {
		 return (
				 <TouchableOpacity activeOpacity={0.8} onPress={()=>{ this.props.navigation.navigate('DealPreview', {deal:item}); }}>
						 <View style={{width:width-40, paddingBottom:50, backgroundColor:'#fff'}}>
							 <Image source={{uri:item.images.split(",")[0]}}  style={{height:width -40, width:width -40}} resizeMode={'cover'}/>
								<Text style={{marginLeft:20, fontSize:20, marginVertical:10}}>{ item.title }</Text>
								<Text style={{marginLeft:20, fontSize:14, color:'gray'}}>From { item.price }</Text>
						</View>
				 </TouchableOpacity>
		 );
 }

 renderPlaceHolder(){
	 return (<View>
		 <Placeholder
			 style={{marginBottom:10}}
				 Animation={Fade}>
				 <PlaceholderMedia isRound={false}
				 style={[{  height:width -40, width:"100%",marginBottom:10	}]}
			 />
		 <PlaceholderLine width={60} />
		 <PlaceholderLine width={60} />
	 </Placeholder></View>)
 }

 renderLeftArrows() {
   var { deals } = this.state;
   if (deals.length == 1) {
     return null;
   }

   return (<TouchableOpacity activeOpacity={0.8} style={{position:'absolute', top: '50%', marginTop:-50, left:-20 }} onPress={() => this._carousel2.snapToPrev()}>
     <Ionicons name="arrow-back-circle" size={50} color="gray"/>
   </TouchableOpacity>);
 }

 renderRightArrows() {
   var { deals } = this.state;
   if (deals.length == 1) {
     return null;
   }

   return (<TouchableOpacity activeOpacity={0.8} style={{position:'absolute', top: '50%', marginTop:-50, right:-20 }} onPress={() => this._carousel2.snapToNext()}>
     <Ionicons name="arrow-forward-circle" size={50} color="gray"/>
   </TouchableOpacity>);
 }

  render() {
    return (
			<View style={{ flex: 1, backgroundColor:'#f1f1f1', paddingLeft:20,paddingRight:20}}>
				<StatusBar backgroundColor="white" barStyle={'dark-content'} />
        <Text style={{marginTop:36, marginBottom:36, fontSize:36}}>Shop</Text>
				{this.state.deals.length == 0 ? this.renderPlaceHolder() : (<View style={{position:'relative'}}>
					<Carousel
							ref={(c) => { this._carousel2 = c; }}
							data={this.state.deals}
							renderItem={this._renderItem}
							sliderWidth={width-40}
							itemWidth={width-40}
						/>
						{this.renderLeftArrows()}
						{this.renderRightArrows()}
				</View>)}
      </View>
    );
  }
}
