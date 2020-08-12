import React from "react";
import { StyleSheet, Text, TextInput, View,TouchableOpacity, FlatList, Image,Dimensions } from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../../AppStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	LocationVenueItem,
} from '../../../components/index.js';

const {width,height} = Dimensions.get('window');


class DealListAllVenues extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
		let { deal } = this.props.navigation.state.params;
		const thumbnailWidth = width-40;
    return (
			<View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>

				<View style={{position:'relative', alignItems:'center', marginTop:20, paddingVertical:24, }}>
					<TouchableOpacity onPress={()=>{ this.props.navigation.goBack() }} style={{position:'absolute', left:0}}>
						<View style={{paddingVertical:18, paddingHorizontal:18}}>
							<Ionicons name="md-close" size={32} color={"#000"} />
						</View>
					</TouchableOpacity>
					<Text style={{ fontSize:18,}}>Privileges</Text>
				</View>

				<View style={{marginLeft:20, marginRight:20}}>
					<FlatList
						 data={deal.venue}
						 horizontal={false}
						 showsHorizontalScrollIndicator={false}
						 showsVerticalScrollIndicator={false}
						 renderItem={({ item })=>{
							 return (<LocationVenueItem
								 title={item.title}
								 image={item.image}
								 tags={item.category}
								 width={thumbnailWidth}
								 onPress={()=>{ this.props.navigation.navigate('Preview', {venue: item})}}/>);
						 }}
						 keyExtractor={(item, index) => `locVenue-${index.toString()}`}
				 	 />
			 </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
		width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
  },
	body: {
    height: 36,
    color: AppStyles.color.text
  },
  facebookContainer: {
		backgroundColor: '#E6C181',
    padding: 14,
    position:'absolute',
		bottom:0,
		left:0,
		right:0
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default DealListAllVenues;
