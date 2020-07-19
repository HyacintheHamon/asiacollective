import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements';

export default class ModalCallScreen extends Component {
  
  constructor(props) {
    super(props);
  }

	
  render() {
		const { data } = this.props;
		const { width, height } = Dimensions.get('window');
    return (
      <Modal
        style={{ width, height }}
        visible={this.props.visible}
        supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        transparent={false}
				animationType={'fade'}
        onRequestClose={() => this.props.onClose()}>
			
				<ImageBackground source={require('../assets/images/bg.png')} style={{width:width, height: height}}>
						<View style={{marginTop: 22, position:'relative', width:width, height:height}}>
							<View style={{alignItems:'center', justifyContent:'center'}}>
							
								<Text style={{color:'#fff', marginTop:10, marginBottom:40}}>Incoming call</Text>
								<Text style={{color:'#fff', fontSize:40}}>PAGER</Text>
								<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:20}}>
									<Text style={{backgroundColor:'#fff', borderRadius:2, paddingHorizontal:5, height:14, color:Colors.bg,fontSize:9, marginRight:4}}>CONFERENCE</Text>
									<Text style={{color:'#fff', fontSize:20, fontWeight:'bold'}}>{data && data.callId ? data.callId.slice(0,13) : ""}</Text>
								</View>
								<Image source={require('../assets/images/logo_1024.png')} style={{height:180, width:180, borderRadius:90}}/>
								<Text style={{color:'#fff', fontSize:12, marginTop:20}}>{data && data.sender ? data.sender : "Unknown sender"}</Text>
								
								
							</View>
							<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', position:'absolute', bottom:120, left:0, right:0}}>
									<TouchableOpacity onPress={()=>{ this.props.onAcceptCall() }}>
										<View style={{marginRight:width/4.5, width:80,height:80, borderRadius:40, alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
											<Icon
												name={'call'}
												type={'material'}
												color={'green'}
												size={60}
											/>
										</View>
									</TouchableOpacity>
									
									<TouchableOpacity onPress={() => { this.props.onDropCall() }}>
									<View style={{marginLeft:width/4.5, width:80,height:80, borderRadius:40, alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
										<Icon
											name={'call-end'}
											type={'material'}
											color={'red'}
											size={60}
										/>
									</View>
									</TouchableOpacity>
							</View>
						</View>
				</ImageBackground>
      
      </Modal>
    );
  }
}
