import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
	View,
  TouchableOpacity,
	FlatList,
	TextInput,
	ActivityIndicator
} from "react-native";

import Toast, {DURATION} from 'react-native-easy-toast';
//import FastImage from "react-native-fast-image";
import {
  AppIcon,
  AppStyles,
} from "../AppStyles";
import { Configuration } from "../Configuration";
import { StackActions, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

class AccountAddCodeScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
			isLoading: false,
      activeSlide: 0,
			book: "",
			location: ""
    };
  }

	handleOnAddBook(){
		this.setState({ isLoading: true });
		this.props.navigation.state.params.handleOnAddBook(this.state.location,this.state.book, (isValid)=>{
			if (isValid) {
				this.props.navigation.goBack();
			}
			else {
				this.refs.toast.show('Invalid Book Code', 500, () => {
    		});
			}
			this.setState({ isLoading: false });
		});
	}

  render() {
		let pickerStyle = {
			inputIOS: {
				width:350,
        paddingVertical:8,
				color:'#000',
				fontSize:16,
        paddingLeft:90
			},
			inputAndroid: {
				width:350,
        paddingVertical:8,
				color:'#000',
				fontSize:16,
        paddingLeft:90
			}
		};
		const placeholder = {
    	label: '',
		}

		const isLoading = this.state.isLoading;
    return (
			<View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>

				<View style={{position:'relative',  marginTop:20, paddingVertical:24, }}>
					<TouchableOpacity onPress={()=>{ this.props.navigation.goBack() }} style={{position:'absolute', left:0}}>
						<View style={{paddingVertical:18, paddingHorizontal:18}}>
							<Ionicons name="md-close" size={32} color={"#000"} />
						</View>
					</TouchableOpacity>
					<Text style={{ fontSize:16, alignSelf:'center'}}>ADD CODE</Text>
					<TouchableOpacity onPress={()=>{
						let { book, location} = this.state;
						if(book.length != 0 && location.length != 0 ){
							this.handleOnAddBook();
						}
					}} style={{position:'absolute', right:0}}>
						<View style={{paddingVertical:18, paddingHorizontal:18}}>
							{ isLoading ? (<ActivityIndicator size="small" color="#000" />) : (<Ionicons name="md-checkmark" size={32} color={"#000"} />) }
						</View>
					</TouchableOpacity>
				 </View>

					<Text style={{marginLeft:20, fontWeight:'bold', marginTop:20}}>Select City</Text>
					<View style={{margin:20, flexDirection:'row', position:'relative'}}>
            <Text style={{color:'#D5B172', fontSize:18, position:'absolute', left:0, top:8}}>Select</Text>
						<RNPickerSelect
							style={pickerStyle}
							placeholder={placeholder}
							onValueChange={(value) => this.setState({ location:value })}
							items={[
									 { label: 'Singapore', value: 'singapore' },
									 { label: 'Bali', value: 'bali' },
									 { label: 'Shanghai', value: 'shanghai' },
							 ]}
						 />
					</View>
					<Text style={{marginLeft:20, fontWeight:'bold', marginTop:20}}>Enter your Unique Code</Text>
					<TextInput
							style={{padding:20, fontSize:18, color:'#D5B172'}}
							placeholder="Type Unique Code"
							onChangeText={text => this.setState({ book: text.toUpperCase() })}
							value={this.state.book}
							autoCapitalize={'none'}
							autoCorrect={false}
							placeholderTextColor={"#D5B172"}
							underlineColorAndroid="transparent"
						/>
					<View>

				</View>

				 <Toast ref="toast"/>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontFamily: AppStyles.fontName.bold,
    fontWeight: "bold",
    color: AppStyles.color.title,
    fontSize: 25
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5
  }
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default AccountAddCodeScreen;
