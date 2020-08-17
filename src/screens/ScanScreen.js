import React from "react";
import { StyleSheet, Text, TextInput, View,TouchableOpacity, FlatList, Image,Dimensions } from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { Dimens as D } from '../resources';
import {
	QRScannerView
} from '../../components';

const {width,height} = Dimensions.get('window');


export default class Scan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {

  }

	async checkPermissionCamera() {
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,{
						title: 'AsiaCollective Camera Permission',
						message:'AsiaCollective needs your permission for your camera to utilize conference feature.'
					}
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					return true;
				} else {
					Alert.alert('Permission Error', 'Permission denied. Please try again');
					return false;
				}
			} catch (err) {
				console.warn(err);
				return false;
			}
		}

		barcodeReceived(event){
			this.props.navigation.state.params.handleOnBarCodeReceived(event);
			this.props.navigation.goBack();
		}

  render() {
		let userFront = false;
		let torchOn = false;
    return (
			<View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>

				<View style={{position:'relative', alignItems:'center', marginTop:20, paddingVertical:24, }}>
					<TouchableOpacity onPress={()=>{ this.props.navigation.goBack() }} style={{position:'absolute', left:0}}>
						<View style={{paddingVertical:18, paddingHorizontal:18}}>
							<Ionicons name="md-close" size={32} color={"#000"} />
						</View>
					</TouchableOpacity>
					<Text style={{ fontSize:16}}>Scan</Text>

				</View>

					<QRScannerView
                scanBarAnimateTime={ 3000 }
                scanBarAnimateReverse={true}
                onScanResult={ this.barcodeReceived.bind(this) }
                renderHeaderView={ null }
                cornerStyle={ styles.cornerStyle }
                rectStyle={ styles.rectStyle }
                //scanBarImage={ Images.ic_scan_bar }
                hintText={ 'Scan the QR code to redeem your privilege' }
                hintTextStyle={ styles.hintTextStyle }
                maskColor={ 'rgba(0, 0, 0, 0.7)' }
                torchOn={ torchOn }
              />
					 

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
  },




	imageBottomMenu: {
    height: D.dp40,
    width: D.dp40,
    resizeMode: 'contain',
  },
  viewMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: D.dp40,
    paddingHorizontal: D.dp16,
  },
  textMenuTitle: {
    color: 'white',
    fontSize: 14,
  },
  viewMenuItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerStyle: {
    borderColor: '#F9F9F9',
    height: 35,
    width: 35,
    borderWidth: 2,
  },
  bottomMenuView: {
    paddingVertical: D.dp16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
  },
  rectStyle: {
    // borderColor: Colors.white_fff,
    // borderWidth: 1,
    height: D.dp200,
    width: D.dp200,
  },
  hintTextStyle: {
    color: '#fff',
    fontSize: D.dp14,
    //backgroundColor: Colors.black,
    //borderRadius: D.dp16,
    paddingHorizontal: D.dp12,
    paddingVertical: D.dp6,
    marginTop: 80,
    textAlign: 'center'
  },
  buttonBg: {
    width: D.dp48,
    height: D.dp48,
    borderRadius: D.dp24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    height: D.dp24,
    width: D.dp24,
    resizeMode: 'contain',
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: D.dp16,
		backgroundColor:'#fff'
    //marginTop: StatusBar.currentHeight + D.dp16,
  },
});
