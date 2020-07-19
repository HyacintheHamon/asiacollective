import React, {Component} from 'react';
import {Platform,
	StyleSheet,
	Text,
	View,
	Image,
	StatusBar,
	Dimensions,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { Icon, Slider } from 'react-native-elements';
import {
	HeaderComponent,
	NotificationItem,
	ModalPicker,
	HorizontalTextInput,
	SwitchItem,
	HorizontalTextInputNoInput
} from '../components';
import Colors from "../constants/Colors";
import NavigationService from '../navigation/NavigationService';
var { width, height } = Dimensions.get("window");

export default class SettingScreen extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			volume: 0,
			isLandscape: width > height ? true: false,
			LPtuneSelected: '',
			HPtuneSelected: '',
			linkSelected: '',
			vibraton:false,
			isSilentMode: false,
			isPager: false,
			email:'',
			password:'',
			confirmPassword: '',
			width: width,
		}
		this._orientationListener = this._orientationListener.bind(this);
		Dimensions.addEventListener("change", this._orientationListener);
	}
	
	componentDidMount(){
		this._isMounted = true;
	}
	
	_orientationListener(){
		var { width, height } = Dimensions.get("window");
		if (width > height ) {
			this.setState({ isLandscape: true, width: DEVICE_HEIGHT });
		} else {
			this.setState({ isLandscape: false, width: DEVICE_WIDTH });
		}
	};
	
	componentWillUnmount() {
		Dimensions.removeEventListener("change", this._orientationListener);
		this._isMounted = false;
	}
	
	render() {
		const tuneOptions = [
			{ key: 1, section: true, label: 'Select Tune' },
			{ key: 2, label: 'Ping', value: "Ping", },
			{ key: 3, label: 'Pong', value: "Pong", },
		];
		
		const reminderOptions = [
			{ key: 1, section: true, label: 'Select Time interval (Min)' },
			{ key: 2, label: '1 min', value: "1min", },
			{ key: 3, label: '5 mins', value: "5min", },
			{ key: 4, label: '30 mins', value: "30min", },
			{ key: 5, label: '1 hour', value: "1hr", },
			{ key: 6, label: '24 hours', value: "24hr", },
		];
		
		const linkOptions = [
			{ key: 1, section: true, label: 'Notification Select' },
			{ key: 2, label: 'Links', value: "link", },
			{ key: 3, label: 'Links', value: "links", },
		];
		const { email,password,confirmPassword } = this.state;
		return (
			<HeaderComponent
			title={'Settings'}
			headerContainerStyle={{}}
			containerStyle={{ backgroundColor: 'gray' }}
			leftButtonImage={false}
			leftIconName={'chevron-left'}
			leftIconType={'evilicon'}
			rightButtonImage={false}
			rightIconName={null}
			leftButtonOnPress={()=>{ this.props.navigation.goBack() }}
			rightIconType={'ionicon'}
			enableRightIcon={false}
			enableLeftIcon={'true'}>
			
				<StatusBar barStyle="light-content" backgroundColor={Colors.statusBarColor}/>
				
				
				
				<ScrollView
					contentContainerStyle={{flexGrow: 1}}
					nestedScrollEnabled={true}
					showsVerticalScrollIndicator={false}
					automaticallyAdjustContentInsets={false}>
				
					<Text style={styles.groupHeader}>User Account</Text>
					<HorizontalTextInputNoInput
						disableLable={true}
						placeholder={'Email address'}
						autoCapitalize={'none'}
						value={email}
						onChangeText={email => this.setState({ email })}
						autoCorrect={false}
					/>
					<HorizontalTextInputNoInput
						disableLable={true}
						placeholder={'Password'}
						autoCapitalize={'none'}
						secureTextEntry={true}
						autoCorrect={false}
						value={password}
						onChangeText={password => this.setState({ password })}
						/>
					<HorizontalTextInputNoInput
						disableLable={true}
						placeholder={'Confirm password'}
						autoCapitalize={'none'}
						secureTextEntry={true}
						autoCorrect={false}
						value={confirmPassword}
						onChangeText={confirmPassword => this.setState({ confirmPassword })}
						/>
					<View style={{backgroundColor:'rgba(255,255,255,0.1)', height:1, marginVertical:4}}></View>
					
					<Text style={styles.groupHeader}>Tunes</Text>
					<ModalPicker
						overlayStyle={{width:width, height:height}}
						optionContainer={{
							borderRadius:5,
							width:this.state.isLandscape ? width*0.5 : width*0.8,
							height:this.state.isLandscape ? 240 : 400,
							left:this.state.isLandscape ? width*0.3: width*0.1,
							top:this.state.isLandscape ? (height-300)/2:  (height-400)/2,
						}}
						cancelContainer={{
							left:this.state.isLandscape ? width*0.3: width*0.1,
							top:this.state.isLandscape? (height-300)/2 + 10 : (height-400)/2 + 10,
							width:this.state.isLandscape ? width*0.5 : width*0.8,
						}}
						data={tuneOptions}
						selectStyle={{backgroundColor:'transparent'}}
						cancelText={"Cancel"}
						onChange={(item)=>{ this.setState({LPtuneSelected:item.value }) }}>
					
						<HorizontalTextInput
							containerStyle={{paddingTop:10, paddingHorizontal:30, paddingBottom:10, borderBottomWidth:0, borderColor:'transparent'}}
							style={{borderWidth:0, borderColor:'transparent', height:32}}
							editable={false}
							placeholder={this.state.LPtuneSelected}
							title={"Low Priority"}
							editable={false}
							value={this.state.LPtuneSelected} />
							<Icon
							name={'chevron-right'}
							type={'evilicon'}
							color={Colors.grayPrimary}
							size={24}
							containerStyle={{position:'absolute', right:8, top:8}}
							/>
					</ModalPicker>
					
					<ModalPicker
						overlayStyle={{width:width, height:height}}
						optionContainer={{
							borderRadius:5,
							width:this.state.isLandscape ? width*0.5 : width*0.8,
							height:this.state.isLandscape ? 240 : 400,
							left:this.state.isLandscape ? width*0.3: width*0.1,
							top:this.state.isLandscape ? (height-300)/2:  (height-400)/2,
						}}
						cancelContainer={{
							left:this.state.isLandscape ? width*0.3: width*0.1,
							top:this.state.isLandscape? (height-300)/2 + 10 : (height-400)/2 + 10,
							width:this.state.isLandscape ? width*0.5 : width*0.8,
						}}
						data={tuneOptions}
						selectStyle={{backgroundColor:'transparent'}}
						cancelText={"Cancel"}
						onChange={(item)=>{ this.setState({HPtuneSelected:item.value }) }}>
						
							<HorizontalTextInput
								containerStyle={{paddingTop:10, paddingHorizontal:30, paddingBottom:10, borderBottomWidth:0, borderColor:'transparent'}}
								style={{borderWidth:0, borderColor:'transparent', height:32}}
								editable={false}
								placeholder={this.state.HPtuneSelected}
								title={"High Priority"}
								editable={false}
								value={this.state.HPtuneSelected} />
							<Icon
								name={'chevron-right'}
								type={'evilicon'}
								color={Colors.grayPrimary}
								size={24}
								containerStyle={{position:'absolute', right:8, top:8}}
								/>
					</ModalPicker>
					
					<View style={{backgroundColor:'rgba(255,255,255,0.1)', height:1, marginVertical:4}}></View>
					<Text style={styles.groupHeader}>Sound Settings</Text>
					<View style={{paddingHorizontal:30}}>
						<Slider
							value={this.state.volume}
							thumbTintColor={'#3f97cb'}
							maximumTrackTintColor={'rgba(255,255,255,0.1)'}
							minimumTrackTintColor={'#259860'}
							onValueChange={volume => this.setState({ volume })}
							/>
					</View>
					<SwitchItem
						text={"Vibration"}
						value={this.state.vibraton}
						onValueChange={vibraton => this.setState({ vibraton })}
						/>
					<SwitchItem
						text={"Silent Mode"}
						value={this.state.isSilentMode}
						onValueChange={isSilentMode => this.setState({ isSilentMode })}
						/>
					
					<View style={{backgroundColor:'rgba(255,255,255,0.1)', height:1, marginVertical:4}}></View>
					<Text style={styles.groupHeader}>Reminders</Text>
					<ModalPicker
						overlayStyle={{width:width, height:height}}
						optionContainer={{
							borderRadius:5,
							width:this.state.isLandscape ? width*0.5 : width*0.8,
							height:this.state.isLandscape ? 240 : 400,
							left:this.state.isLandscape ? width*0.3: width*0.1,
							top:this.state.isLandscape ? (height-300)/2:  (height-400)/2,
						}}
						cancelContainer={{
							left:this.state.isLandscape ? width*0.3: width*0.1,
							top:this.state.isLandscape? (height-300)/2 + 10 : (height-400)/2 + 10,
							width:this.state.isLandscape ? width*0.5 : width*0.8,
						}}
						data={reminderOptions}
						selectStyle={{backgroundColor:'transparent'}}
						cancelText={"Cancel"}
						onChange={(item)=>{ this.setState({reminderSelected:item.value }) }}>
					
							<HorizontalTextInput
								containerStyle={{paddingTop:10, paddingHorizontal:30, paddingBottom:10, borderBottomWidth:0, borderColor:'transparent'}}
								style={{borderWidth:0, borderColor:'transparent', height:32}}
								editable={false}
								placeholder={this.state.reminderSelected}
								title={"Select time interval (Min)"}
								editable={false}
								value={this.state.reminderSelected} />
							<Icon
								name={'chevron-right'}
								type={'evilicon'}
								color={Colors.grayPrimary}
								size={24}
								containerStyle={{position:'absolute', right:8, top:8}}
								/>
					</ModalPicker>
					<View style={{backgroundColor:'rgba(255,255,255,0.1)', height:1, marginVertical:4}}></View>
					
					<Text style={styles.groupHeader}>Low Priority Repeat Alerts</Text>
					<ModalPicker
						overlayStyle={{width:width, height:height}}
						optionContainer={{
							borderRadius:5,
							width:this.state.isLandscape ? width*0.5 : width*0.8,
							height:this.state.isLandscape ? 240 : 400,
							left:this.state.isLandscape ? width*0.3: width*0.1,
							top:this.state.isLandscape ? (height-300)/2:  (height-400)/2,
						}}
						cancelContainer={{
							left:this.state.isLandscape ? width*0.3: width*0.1,
							top:this.state.isLandscape? (height-300)/2 + 10 : (height-400)/2 + 10,
							width:this.state.isLandscape ? width*0.5 : width*0.8,
						}}
						data={reminderOptions}
						selectStyle={{backgroundColor:'transparent'}}
						cancelText={"Cancel"}
						onChange={(item)=>{ this.setState({reminderSelected:item.value }) }}>
					
							<HorizontalTextInput
								containerStyle={{paddingTop:10, paddingHorizontal:30, paddingBottom:10, borderBottomWidth:0, borderColor:'transparent'}}
								style={{borderWidth:0, borderColor:'transparent', height:32}}
								editable={false}
								placeholder={this.state.reminderSelected}
								title={"Select time interval (Min)"}
								editable={false}
								value={this.state.reminderSelected} />
							<Icon
								name={'chevron-right'}
								type={'evilicon'}
								color={Colors.grayPrimary}
								size={24}
								containerStyle={{position:'absolute', right:8, top:8}}
							/>
					</ModalPicker>
					<View style={{backgroundColor:'rgba(255,255,255,0.1)', height:1, marginVertical:4}}></View>
					
					<Text style={styles.groupHeader}>Notification Groups</Text>
					<TouchableOpacity>
						<View style={{paddingHorizontal:30, paddingVertical:8}}>
							<Text style={{color:'#fff'}}>All groups</Text>
							<Icon
							name={'chevron-right'}
							type={'evilicon'}
							color={Colors.grayPrimary}
							size={24}
							containerStyle={{position:'absolute', right:8, top:8}}/>
						</View>
					</TouchableOpacity>
					
					<View style={{backgroundColor:'rgba(255,255,255,0.1)', height:1, marginVertical:4}}></View>
					<Text style={styles.groupHeader}>Notification Links</Text>
					<ModalPicker
						overlayStyle={{width:width, height:height}}
						optionContainer={{
							borderRadius:5,
							width:this.state.isLandscape ? width*0.5 : width*0.8,
							height:this.state.isLandscape ? 240 : 400,
							left:this.state.isLandscape ? width*0.3: width*0.1,
							top:this.state.isLandscape ? (height-300)/2:  (height-400)/2,
						}}
						cancelContainer={{
							left:this.state.isLandscape ? width*0.3: width*0.1,
							top:this.state.isLandscape? (height-300)/2 + 10 : (height-400)/2 + 10,
							width:this.state.isLandscape ? width*0.5 : width*0.8,
						}}
						data={linkOptions}
						selectStyle={{backgroundColor:'transparent'}}
						cancelText={"Cancel"}
						onChange={(item)=>{ this.setState({linkSelected:item.value }) }}>
					
							<HorizontalTextInput
								containerStyle={{paddingTop:10, paddingHorizontal:30, paddingBottom:10, borderBottomWidth:0, borderColor:'transparent'}}
								style={{borderWidth:0, borderColor:'transparent', height:32}}
								editable={false}
								placeholder={this.state.linkSelected}
								title={"Select Notification type"}
								editable={false}
								value={this.state.linkSelected} />
							<Icon
								name={'chevron-right'}
								type={'evilicon'}
								color={Colors.grayPrimary}
								size={24}
								containerStyle={{position:'absolute', right:8, top:8}}/>
					</ModalPicker>
					<View style={{backgroundColor:'rgba(255,255,255,0.1)', height:1, marginVertical:4}}></View>
					
					<SwitchItem
						text={"Pager"}
						value={this.state.isPager}
						onValueChange={isPager => this.setState({ isPager })}/>
						
				</ScrollView>
			</HeaderComponent>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		paddingTop:24,
	},
	groupHeader: {
		paddingHorizontal:30,
		marginVertical:4,
		color:Colors.bluePrimary,
	},
	instructions: {
		textAlign: 'center',
		color: '#fff',
		marginBottom: 5,
	},
});
