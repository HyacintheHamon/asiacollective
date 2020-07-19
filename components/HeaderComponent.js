import React, { PureComponent } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  Platform,
	StatusBar,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import Colors from "../constants/Colors";
import NavigationService from "../navigation/NavigationService";
import { withNavigation } from "react-navigation";
import { Icon } from 'react-native-elements';
const {height, width} = Dimensions.get('window');

class HeaderComponent extends PureComponent {
  state = {};
  renderHeader() {
    const {
      leftButtonImage,
      rightButtonImage,
      leftButtonOnPress,
      rightButtonOnPress,
      title,
      titleStyle,
      headerContainerStyle,
      
		leftIconSize,
      leftIconName,
      leftIconType,
	  rightIconName,
	  rightIconType,
	  
	  enableRightIcon,
	  enableLeftIcon
    } = this.props;
    return (
		<View style={[styles.headerContainer, headerContainerStyle]}>
	        <View style={styles.headerItem}>
	          	{enableLeftIcon?(<TouchableOpacity onPress={leftButtonOnPress}>
					<View style={{marginLeft:4, marginRight:10, width:30, height:30, alignItems:'center', justifyContent:'center', borderRadius:15,  borderColor:Colors.grayPrimary}}>
						{leftButtonImage ? (<Image style={styles.icon} source={leftButtonImage} />):(<Icon
							name={leftIconName}
							type={leftIconType}
							color={Colors.grayPrimary}
							size={leftIconSize ? leftIconSize : 28}
						/>)}
					</View>
	          	</TouchableOpacity>):<View style={{marginLeft:4, marginRight:10, width:30,height:30}}></View>}
	        </View>
	        <View style={[styles.headerItem]}>
	           	<Text style={[styles.title, titleStyle]}>{title}</Text>
	        </View>
	        <View style={[styles.headerItem, { alignItems: "flex-end" }]}>
				{enableRightIcon ? (<TouchableOpacity onPress={rightButtonOnPress}>
					<View style={{marginLeft:10, marginRight:4, width:30, height:30, alignItems:'center', justifyContent:'center', borderRadius:15, borderWidth:1, borderColor:Colors.grayPrimary}}>
					  {rightButtonImage ? (<Image style={styles.icon} source={rightButtonImage} />):(<Icon
						  name={rightIconName}
						  type={rightIconType}
						  color={Colors.grayPrimary}
						  size={24}
					  />)}
				  </View>
			  </TouchableOpacity>) : <View style={{marginLeft:10, marginRight:4, height:30,width:30}}></View> }
	        </View>
	  </View>
    );
  }
  render() {
    const { containerStyle } = this.props;
		var Container = SafeAreaView;
    return (
      <Container style={[{flex:1}, containerStyle]}>
	  	<ImageBackground source={require('../assets/images/bg.png')} style={{flex:1}}>
        	{this.renderHeader()}
        	<View style={{flex:1}}>
						{this.props.children}
					</View>
		</ImageBackground>
      </Container>
    );
  }
}

HeaderComponent.defaultProps = {
  leftButtonImage: null,
  leftButtonOnPress: null,
  headerContainerStyle: {
    
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    paddingBottom: 16,
		backgroundColor: Colors.statusBarColor,
		zIndex:9,
	paddingTop:  Platform.OS === 'ios' ? 32: 8,
  },
  headerItem: {
    // flex: 1
  },
  title: {
    flex: 1,
    alignSelf: "center",
    fontSize: 16,
    color: Colors.white,
	 paddingTop:7,
  },
  icon: {
    width: 24,
    height: 24
  }
});

export default HeaderComponent;
