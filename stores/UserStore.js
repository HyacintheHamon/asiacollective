import {Platform} from 'react-native'
import { observable, action, toJS } from 'mobx';
import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';
const md5 = require('md5');
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
const GRAVATAR_URL = "https://s.gravatar.com/avatar";
const axios = require('axios');
const SERVER_URL = 'https://asia-collective.herokuapp.com';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default class userStore {
	@observable
	user = {
		uid:'',
		email: '',
		status: '',

		profileUrl: '',
		firstName: '',
		lastName: '',
		contact:'',
		books: [],
		authSource: "",
		isEnableThirdPartyLogin: false,
	}

	@observable
	lastFCMToken = "";

	onAuthStateChangedRef;

	setUser(data){
		console.log(data);
		this.user = Object.assign({}, this.user, data);
		AsyncStorage.setItem('user', JSON.stringify(this.user));
		global.current_user = toJS(this.user);
		console.log(global.current_user);
		this.generateProfilePicture();
	}

	generateProfilePicture(){
		// preprocess profile url
		var hash = md5(this.user.email);
		var profileUrl = `${GRAVATAR_URL}/${hash}?s=80&d=identicon`;
		this.user.profileUrl = profileUrl;
	}

	changepassword(oldPassword, newPassword,callback){
		var currentUser = firebase.auth().currentUser;
		firebase.auth().signInWithEmailAndPassword(currentUser.email, oldPassword).then((response)=>{

			// signin success
			if(!response) {
				callback(false);
			}
			else {
				var user = firebase.auth().currentUser;
				user.updatePassword(newPassword).then(function() {
					callback();
				}).catch(function(error) {
					console.log(error);
					callback();
				});
			}
		});
	}

	async logoutUser(){
		this.removeDeviceFCMToken(this.lastFCMToken, ()=>{
      this.user = {
        uid:'',
    		email: '',
    		status: '',

    		profileUrl: '',
    		firstName: '',
    		lastName: '',
    		contact:'',
    		books: [],
    		authSource: "",
    		isEnableThirdPartyLogin: false
      };

			AsyncStorage.setItem('user', JSON.stringify({}));
			firebase.auth().signOut().then(async ()=> {
				console.log("Signing out");

				const isSignedIn = await GoogleSignin.isSignedIn()
				if(isSignedIn){
					try {
						await GoogleSignin.revokeAccess();
						await GoogleSignin.signOut();
					} catch (error) {
						console.error(error);
					}
			 }
			}).catch(function(error) {

			});

		})
	}

	isSignedIn(callback){
		this.onAuthStateChangedRef = firebase.auth().onAuthStateChanged(response => {
			console.log('response', response);
			if(!response) {
				callback(false);
			}
			else {
				var isLoggedIn = false;
				AsyncStorage.getItem('user', (error,cachedItem)=>{
					// if the length of stringified value is less than 2, that means user cache is empty -> {}.toString();
					isLoggedIn = cachedItem && cachedItem.length > 2 ? true : false;
					if(!isLoggedIn){
						callback(false);
						return;
					}

					var result = JSON.parse(cachedItem);
					const uid = result.uid.length != 0 ? result.uid: response.uid;
					console.log('uid', uid);
					var docRef = firebase.firestore().doc(`users/${uid}`);
					docRef.get().then((doc)=> {
						console.log('doc', doc);
						if (doc.exists) {
							console.log("Document data:", doc.data());
							const _user = doc.data();
							this.setUser(Object.assign({}, _user, {email: result.email, uid: uid} ))
							callback(true);

						} else {
							console.log("No such document!");
							callback(false);
						}
					}).catch((error)=> {
						console.log("Error getting document:", error);
						callback(false);
					});
				}).catch((e)=>{
					console.log('Async Storage error!');
					callback(false);
				});



			}
		})
	}

	login(email,password,callback){
		console.log('logging in',email,password);
		firebase.auth().signInWithEmailAndPassword(email, password).then((response)=>{
			console.log(response,'responsssse');
			if(!response) {
				callback(false);
			}
			else {
				const uid = response.user.uid;
				var docRef = firebase.firestore().doc(`users/${uid}`);
				docRef.get().then((doc)=> {
					console.log('oassed here');
					if (doc.exists) {
						console.log("Document data:", doc.data());
						const _user = doc.data();
						this.setUser(Object.assign({}, _user, {email: response.user.email, uid: uid} ))
						callback(true);

					} else {
						console.log("No such document!");
						callback(false);

					}
				}).catch((error)=> {
					console.log("Error getting document:", error);
					callback(false);
				});
			}
		}).catch(function(e){
			console.log('some error over ehere',e)
			callback(false);
		});
	}


	async socialLogin(type,params,callback){
		var credential = null;
		var firebaseUserCredential = null;

		if(type=='google'){
			var {idToken, accessToken} = params;
	    // create a new firebase credential with the token
	    credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
	    // login with credential
	    firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

			// create or retrieve
 			//callback(firebaseUserCredential.user.toJSON());
		}
		else if(type=='facebook'){
				// create a new firebase credential with the token
		    credential = firebase.auth.FacebookAuthProvider.credential(params.accessToken);

				// login with credential
		    firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
		}


		// process it here
		var fireUser = firebaseUserCredential.user.toJSON();
		var uid = fireUser.uid;
		var displayName = fireUser.providerData[0].displayName;
		var email = fireUser.providerData[0].email;

		var user = {
			uid:uid,
			email:email,
			firstName:displayName.split(" ")[0],
			lastName: displayName.split(" ")[1],
			status:"available",
			contact:"",
			books: [],
			devices: [],
			authSource:type,
		};


		var docRef = firebase.firestore().doc(`users/${uid}`);
		docRef.get().then((doc)=> {
			if (doc.exists) {
				const _user = doc.data();
				this.setUser(Object.assign({}, _user));
				callback(true);
			}
			else {
				firebase.firestore().collection('users').doc(uid).set(user).then((data)=>{
					console.log('data ' , data);
					this.setUser(Object.assign({}, user ))
					callback(true);
				}).catch((error)=>{
					callback(false)
					console.log('error ' , error)
				})
			}
		});
	}

	signUp(user,callback) {
		firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((response) => {
			const uid = response.user.uid;
			delete user.password;
			delete user.email;


			firebase.firestore().collection('users').doc(uid).set(user).then((data)=>{
				console.log('data ' , data);
				this.setUser(Object.assign({}, user, {email: response.user.email, uid: uid} ))
				callback(true);
			}).catch((error)=>{
				callback(false)
				console.log('error ' , error)
			})
		})
		.catch(error => {
			console.log(error.message);
			callback(false, error.message)
		});

	}

	resetPassword(emailAddress,callback) {
		var auth = firebase.auth();
		auth.sendPasswordResetEmail(emailAddress).then(function() {
		  callback(true);  // Email sent.
		}).catch(function(error) {
		  callback(false);  // An error happened.
	  });

	}

	addDeviceFCMToken(token,callback){
		const uid = this.user.uid;
		if(!uid){
			callback(false);
			return;
		}

		this.lastFCMToken = token;
		var payload = Object.assign({}, this.user);
		payload['devices'] = firebase.firestore.FieldValue.arrayUnion(token);
		payload['devicesLoggedIn'] = firebase.firestore.FieldValue.arrayUnion(token);

		firebase.firestore().doc(`users/${uid}`).update(payload).then((data)=>{
			console.log('update successful');
			callback(true);
		}).catch((error)=>{
			console.log('update error')
			callback(false)
		})
	}

	addBook(location,token,callback){
		const uid = this.user.uid;
		if(!uid){
			callback(false);
			return;
		}

		var book = location+"_"+token;
		var payload = Object.assign({}, this.user);
		payload['books'] = firebase.firestore.FieldValue.arrayUnion(book);

		axios.get(`https://asia-collective.herokuapp.com/api/book/validate-book?location=${location}&book_number=${token}&edition=1`).then( (response)=> {

			if(response.data.isAvailable){
				firebase.firestore().doc(`users/${uid}`).update(payload).then((data)=>{
					console.log('update successful');
					this.user.books.push(book);
					callback(true);
				}).catch((error)=>{
					console.log('update error',error)
					callback(false)
				})
			}
			else {
				callback(false)
			}
		});
	}

	removeDeviceFCMToken(token,callback){
		const uid = this.user.uid;
		if(!uid || token.length == 0){
			callback(false);
			return;
		}

		var payload = Object.assign({}, this.user);
		payload['devicesLoggedIn'] = firebase.firestore.FieldValue.arrayRemove(token);
		firebase.firestore().doc(`users/${uid}`).update(payload).then((data)=>{
			callback(true);
		}).catch((error)=>{
			callback(false)
		})
	}

	setAvailabilityStatus(status){
		const uid = this.user.uid;
		var payload = Object.assign({}, this.user);
		payload['status'] = status;

		firebase.firestore().doc(`users/${uid}`).update(payload).then((data)=>{
			console.log('update successful');
		}).catch((error)=>{
			console.log('update error')
		})
	}

	getSettings(callback){
		axios.get(`${SERVER_URL}/api/settings`).then( (response) => {
			this.user.isEnableThirdPartyLogin = response.data.isEnableThirdPartyLogin;
			callback();
  	});
	}

	checkVenueQr(payload ,callback){
		axios.post(`${SERVER_URL}/api/offer/validate-offer`, payload).then(function (response) {
			console.log('validate offer', response);
			callback(response.data.isAvailable)
  	});
	}

	getLocations(callback){
		axios.get(`${SERVER_URL}/api/venues?groupedByLocation=true&simplfied=true`).then(function (response) {
			callback(response.data.data)
  	});
	}

	async getBooks() {
		var books = [];
console.log('books here now', this.user);
		if(this.user.books.length){
			let book = this.user.books[0];
			await asyncForEach( this.user.books, async function(book){
				let result = await axios.get(`${SERVER_URL}/api/book?location=${book.split("_")[0]}&book_number=${book.split("_")[1]}&edition=1`);
				books = books.concat(result.data.books);
			});
		}

		return books;
	}

  getCheckoutUrl(location,callback){
    axios.get(`${SERVER_URL}/api/checkout-urls-by-location?location=${location}`).then(function (response) {
			callback(response.data.data)
  	});
  }

	getOffer(venue_id, callback){
		axios.get(`${SERVER_URL}/api/offer?venue_id=${venue_id}`).then(function (response) {
			var offers = response.data.data;
			callback(offers)
  	});
	}

	getVenues(callback){
		axios.get(`${SERVER_URL}/api/venues`).then(function (response) {
			console.log(response);
			callback(response.data.data)
		});
	}

	getDeals(callback){
		axios.get(`${SERVER_URL}/api/deals`).then(function (response) {
			console.log(response);
			callback(response.data.data)
		});
	}

}
