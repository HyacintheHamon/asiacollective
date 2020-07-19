import React from "react";
import { View, Text, Switch } from "react-native";
import Colors from "../constants/Colors";

export default props => (
  <View
    style={{
      flexDirection: "row",
      paddingHorizontal: 30,
      paddingVertical: 3,
      // borderTopWidth: 0.5,
      // borderBottomWidth: 0.5,
      // borderColor: "#eee",
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    <Text style={[{ color: Colors.white, fontSize:12 }, props.textStyle]}>{props.text}</Text>
    <Switch
         value={props.value}
         onValueChange={props.onValueChange}
         thumbColor={'#3f97cb'}
         trackColor={'gray'}
         ios_backgroundColor={'green'}
         style={{transform: [{scaleY:0.8}, {scaleX:0.9}] }} />
  </View>
);
