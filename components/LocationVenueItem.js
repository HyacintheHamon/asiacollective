import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AnimatedFadeImage } from './index.js';

const LocationItem = ({image,title, tags, onPress, width, thumbnailStyle}) =>{
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress}>
	    <View style={[{ position:"relative", paddingBottom:20}, thumbnailStyle]}>
				<AnimatedFadeImage source={{uri:image}} resizeMode={"cover"} style={{width:width ? width : 280, height:120}} containerStyle={{marginBottom:4, backgroundColor:'ghostwhite'}}/>
				<Text style={{fontSize:18, marginVertical:4}}>{title}</Text>
 			 <Text style={{fontSize:12, color:'gray'}}>{tags}</Text>
	    </View>
		</TouchableOpacity>);
}

export default LocationItem;
