import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';
import { WebView } from 'react-native-webview'
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

export default class Terms extends Component {

    constructor(props) {
        super(props);
    }

    handleLeftTitleBarPress(){
        this.props.navigation.goBack();
    }


    render() {
        let heightStatusBar = Platform.OS == 'ios' ? 64: 54;
        const y = (height/2)-(75+heightStatusBar);
        const x = (width/2)-100;
        return (
            <View style={{flex:1}}>
            <View style={styles.tabStyle}>
            <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <View style={{ width: 40, height: 40 }}>
            <Icon name="md-arrow-back" size={32} color={"#000"} />
            </View>
          </TouchableOpacity>
				        <Text style={styles.title}>Terms & Conditions</Text>
			        </View>
                    <View style={{flex:1}}>
                        <WebView 
                            source={{uri: 'https://theasiacollective.com/terms-and-conditions/'}}
                            style={{ flex: 1, alignItems: 'center',justifyContent: 'center'}}
                            startInLoadingState={true}
                            renderLoading={()=>{return false;}}
                            renderError={()=>{ return <View style={styles.error}><Text>Connection Error</Text><Text>Please try again later.</Text></View>}} />
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabStyle: {
		width: 'auto',
		paddingTop:34,
		paddingBottom:20,
		backgroundColor: '#fff',
    },
    closeButton: {
        left: 20,
        top: 40,
    },
    title: {
		alignSelf: "center",
		justifyContent:'center'
    },
     error: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    container: {
        flex: 1,
        paddingTop: 30,
        paddingLeft: 3,
        paddingRight:3,
    },
    bgBlack: {
        backgroundColor: '#030A16',
    },
    input: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        marginTop:8,
    },
    button: {
        backgroundColor: '#21CE99',
        paddingTop:14,
        paddingBottom:14,
        borderRadius: 5,
        margin: 0,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    },
    textNormal: {
        fontFamily:'AvenirLTStd-Book',
    },
    textEmphasized:{
        fontFamily:'AvenirLTStd-Medium',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom:20,
        paddingLeft:10,
        paddingRight:10
    }
});
