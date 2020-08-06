import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AnimatedFadeImage } from './index.js';
import Feather from 'react-native-vector-icons/Feather';

// {isPurchased ? <View style={{position:'absolute', top:0,right:0, paddingVertical:4, paddingHorizontal:6, backgroundColor:'#E6BF80', zIndex:99}}><Text style={{color:'#fff', fontSize:14}}>Purchased</Text></View> : null}
// {!isPurchased ? <View style={{position:'absolute', top:160,right:0, padding:4, }}><Feather name={"shopping-cart"} size={28} color={"#000"} /></View> : null}
const LocationItem = ({image,title,isPurchased,venuesCount, onPress, width}) =>{
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{marginBottom:14}}>
	    <View style={{ position:"relative", paddingBottom:10}}>
				<AnimatedFadeImage source={{uri:image}} resizeMode={"cover"} style={{width:width, height:150}} containerStyle={{marginBottom:4, backgroundColor:'ghostwhite'}}/>
	      <Text style={{fontSize:16, marginTop:4, marginBottom:2}}>{title}</Text>
				<Text style={{fontSize:14, color:'gray'}}>{venuesCount+" Venues"}</Text>

	    </View>
		</TouchableOpacity>);
}

export default LocationItem;
