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

@inject('userStore')
@observer
export default class ListsScreen extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			list : [],
		}
	}
	
	componentDidMount(){
		this.fetchData();
	}
	
	fetchData(){
		const { email } = this.props.userStore.user;
		this.setState({ loading:true });
		fetch(`${API_URL}/api/get-lists`).then(function(response){ return response.json() }).then((lists)=>{
			var list = [];
			lists.forEach(function(data){
				var recipients = data.recipients;
				var index = recipients.findIndex((currentVal)=> currentVal.email == email);
				if(index != -1){
					list.push({ name: data.name, status: recipients[index].status });
				}
			});
			this.setState({ list:list, loading:false })
		});
	}
	
	handleStatusChange(data, index){
		const { email } = this.props.userStore.user;
		var url = "";
		if(data.status == STATUS_INVITATION_ACCEPTED){
			url = `${API_URL}/api/reject-list-user?name=${data.name}&user=${email}`;
		}
		if(data.status == STATUS_INVITATION_REJECTED || data.status == STATUS_INVITATION_PENDING){
			url = `${API_URL}/api/accept-list-user?name=${data.name}&user=${email}`;
		}
		
		fetch(url).then(function(response){ return response.json() }).then(()=>{ });
		
		var list = this.state.list;
		var status = list[index]['status'];
		if(status == STATUS_INVITATION_PENDING){
			list[index]['status'] = STATUS_INVITATION_ACCEPTED;
		}
		else if(status == STATUS_INVITATION_ACCEPTED){
			list[index]['status'] = STATUS_INVITATION_REJECTED;
		}
		else if(status == STATUS_INVITATION_REJECTED){
			list[index]['status'] = STATUS_INVITATION_ACCEPTED;
		}
		
		this.setState({list: list});
	}

  render() {
	  const { email } = this.props.userStore.user;
    return (
	  <HeaderComponent
		  title={"List of subscriptions"}
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
		
				{this.state.list.map((currentVal,index)=>{
					return (<View key={index}>
						<SwitchItem
							text={currentVal.name}
							textStyle={{color:Colors.statusBarColor}}
							value={currentVal.status != STATUS_INVITATION_ACCEPTED ? false : true}
							onValueChange={(vibraton) => { this.handleStatusChange(currentVal,index) } }
						/>
						<View style={{backgroundColor:'rgba(0,0,0,0.1)', height:1, marginVertical:5}}></View>
					</View>);
					
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
});
