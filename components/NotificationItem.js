import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
import { Icon } from 'react-native-elements';
import SwipeableViews from 'react-swipeable-views-native';

export default class NotificationItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index:0
		};
	}
	
  render() {
    const {
      title,
	  isActive,
	  heartbeat,
	  extraData,
  } = this.props.data;
	const {onPress,onDelete} = this.props;
	const heartBeatDate = new Date(heartbeat);
	console.log(this.state.index)
    return (
				<SwipeableViews slideContainer={styles.slideContainer} index={this.state.index} onChangeIndex={(a,b)=> { this.setState({index:a})}}>
					<View style={[styles.slide, styles.slide1]}>
						<TouchableOpacity onPress={onPress}>
								<View style={styles.container}>
								<Icon
								name='circle'
								type='font-awesome'
								color={isActive ? Colors.lightGreen: Colors.red}
								size={8}
								containerStyle={{position:'absolute', left:18, top:16}}
								/>
								<View style={{paddingLeft:20}}>
								<Text style={styles.title}>{title}</Text>
								<Text style={styles.subtitle}>{heartBeatDate.toDateString().slice(0,10)+" "+ heartBeatDate.toTimeString().slice(0,5)} {extraData && extraData.urlToOpen ? " - Contains URL click to open":''}</Text>
								</View>
								{!isActive ? (<Icon
								name='exclamation'
								type='simple-line-icon'
								color={Colors.red}
								size={20}
								containerStyle={{position:'absolute', right:50, top:14}}
								/>): null}
								</View>
					</TouchableOpacity>
					</View>
					<View style={[styles.slide, styles.slide2]}>
					
					<TouchableOpacity onPress={()=>{ this.setState({index:0}); onDelete(); }}>
						<View style={{flexDirection:'row', paddingHorizontal:50}}>
							<Icon name='md-trash' type='ionicon' color='#fff' size={28} />
							<Text style={styles.text}>DELETE</Text>
						</View>
					</TouchableOpacity>
					</View>
			</SwipeableViews>
    );
  }
}


const styles = StyleSheet.create({
  container: {
	  flexDirection:'row',
	  alignItems:'center',
	  position:'relative',
	  paddingHorizontal:20,
  },
  title: {
	  color:Colors.white,
	  fontSize:12,
	  paddingBottom:4,
  },
  subtitle: {
	  color:Colors.gray,
	  fontSize:12,
  },
	
	slideContainer: {
		borderBottomWidth:1,
		borderBottomColor:"rgba(255,255,255,0.1)",
  },
  slide: {
		paddingTop:10,
		paddingBottom:10,
    height:70,
		borderBottomWidth:1,
		borderBottomColor:"rgba(255,255,255,0.1)",
  },
  slide2: {
    backgroundColor: 'red',
		alignItems:'center',
		justifyContent:'center',
		borderBottomColor:"rgba(255,255,255,0.1)",
  },
  text: {
    color: '#fff',
    fontSize: 16,
		paddingLeft:20,
		paddingTop:4,
  },
});
