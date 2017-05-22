import React from 'react';
import Firebase from 'firebase';
import firebaseConfig from '../../firebase';

class Autentication extends React.Component {

	constructor() {
		super();

		this.logout = this.logout.bind(this);

		let userName, userPhoto, userID;

		// Firebase.auth().onAuthStateChanged((user) => {
		// 	if (user) {
		// 		const user = Firebase.auth().currentUser;
		// 		console.log(user, ' user ');
		// 	} else {
		// 		console.log('onAuthStateChanged else')
		// 	}
		// });

		fetch('/api', {

			method: 'GET'

		}).then((res) => {

			return res.json();

		}).then((json) => {

			console.log(json, ' json')

			Firebase.auth().signInWithCustomToken(json.firebaseToken).catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
			});

			Firebase.auth().onAuthStateChanged((user) => {

				if(user !== null) {

					user.updateProfile({
						displayName: json.userName,
						photoURL: json.userPic
					}).then(() => {

						console.log('user != null');

					}, (error) => {

						console.log('error within user != null');

					});
				} else {
					console.log('user is not logged in. user == null ')
				}
			});

		}).catch((err) => {

			console.log(err, 'err');

		});

	}


	logout () {
		Firebase.auth().signOut().then(() =>{
			console.log('success');
		})
	}

	render () {
		return (
			<div>
			<a onClick={this.logout}>logout</a>
			</div>
			)
	}

};

export default Autentication;