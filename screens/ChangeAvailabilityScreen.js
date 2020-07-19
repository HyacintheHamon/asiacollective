import React, {Component} from 'react';
import {Platform,
	StyleSheet,
	Text,
	View,
	Image,
	StatusBar,
	TextInput,
	ImageBackground,
	TouchableOpacity,
	RefreshControl,
	ActivityIndicator,
	ScrollView,
} from 'react-native';
import WebView from 'react-native-webview';
import firebase from '@react-native-firebase/app';
import {  Icon } from 'react-native-elements';
import {
	HeaderComponent,
	SwitchItem,
	NotificationItem
} from '../components';
import Colors from "../constants/Colors";
import NavigationService from '../navigation/NavigationService';
const STATUS_INVITATION_ACCEPTED = "accepted"; // only user can change, can be deleted from the list
const STATUS_INVITATION_REJECTED = "rejected"; // only user can change, cannot be deleted from the list
const STATUS_INVITATION_PENDING = "pending"; // can be deleted from the list
import {API_URL} from '../app.json';
import { inject, observer } from 'mobx-react/native'

const STATUS = {
	BUSY: "busy",
	AVAILABLE: "available",
	DO_NOT_DISTURB: "do_not_disturb",
};
const options = [
    {
        key: 'AVAILABLE',
        text: 'Available',
    },
    {
        key: 'DO_NOT_DISTURB',
        text: 'Do not disturb',
    }
];

@inject('userStore')
@observer
export default class ListsScreen extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			value:null
		}
	}
	
	componentDidMount(){
		this.fetchData();
	}
	
	fetchData(){
		if(this.props.userStore.user.status && this.props.userStore.user.status.length != 0){
			console.log('setstate',this.props.userStore.user.status.toUpperCase() );
			this.setState({value : this.props.userStore.user.status.toUpperCase()})
		}
		console.log(this.props.userStore.user.status);
	}
	
	handleStatusChange(key){
		this.setState({ value: key });
		this.props.userStore.setAvailabilityStatus(STATUS[key])
	}

  render() {
	  const { email } = this.props.userStore.user;
		const { value } = this.state;
    return (
	  <HeaderComponent
		  title={"Change Status"}
		  headerContainerStyle={{backgroundColor: Colors.statusBarColor }}
		  containerStyle={{  }}
		  leftButtonImage={false}
		  leftIconName={'arrow-left'}
		  leftIconSize={24}
		  leftIconType={'simple-line-icon'}
		  rightButtonImage={false}
		  rightIconName={null}
		  leftButtonOnPress={()=>{ this.props.navigation.goBack() }}
		  rightIconType={'ionicon'}
		  enableRightIcon={false}
		  enableLeftIcon={'true'}>
			<StatusBar barStyle="light-content" backgroundColor={Colors.statusBarColor}/>
			<ScrollView
				contentContainerStyle={{flexGrow: 1, paddingTop:10, backgroundColor:'#fff'}}
				nestedScrollEnabled={true}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.fetchData.bind(this)}/>}
				automaticallyAdjustContentInsets={false}>
				{options.map(item => {
				    return (
							<TouchableOpacity style={{paddingLeft:10,paddingRight:10}} key={item.key}  onPress={() => this.handleStatusChange(item.key)}>
				        <View  style={styles.buttonContainer}>
				            <Text>{item.text}</Text>
										    {(<View style={value === item.key ?styles.checkedCircle:styles.circle} />)}
				        </View>
							</TouchableOpacity>
				    )
				})}
				
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
	buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
},
circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
},
checkedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.bg,
		borderWidth: 1,
    borderColor: '#ACACAC',
},

});
