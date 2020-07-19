import React, { PureComponent } from "react";
import { View, Text, StyleSheet, } from "react-native";
import PropTypes from "prop-types";

export default class ErrorBar extends PureComponent {
  render() {
    const {
      errors,
    } = this.props;

    return (
      <View>
			 {errors.map((errorMsg,i)=>{
			 	return (<View key={`e-${i}`} style={styles.container}>
								<Text style={styles.message}>{errorMsg}</Text>
						</View>);
			 })}
		</View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
	  backgroundColor:'transparent',
  },
  message:{
	  padding: 8,
	  alignSelf: 'center',
	  color:"orange",
	  fontSize:11,
  }
});
