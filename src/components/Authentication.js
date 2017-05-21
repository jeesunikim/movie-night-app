import React from 'react';
import Firebase from 'firebase';
import firebaseConfig from '../../firebase';

class Autentication extends React.Component {

	constructor() {
		super();

		this.logout = this.logout.bind(this);

		let userName, userPhoto, userID;

		Firebase.auth().onAuthStateChanged((user) => {
    		if (user) {
    			const user = Firebase.auth().currentUser;
    			console.log(user, ' user ');
    		} else {
        		console.log('onAuthStateChanged else')
    		}
		});

		fetch('/api', {

	    	method: 'GET'

	    }).then((res) => {

    		return res.json();

	    }).then((json) => {

	    	console.log(json, ' json')

	    	Firebase.auth().signInWithCustomToken(json.firebaseToken).catch((error) => {
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log('hi')
			});

			Firebase.auth().onAuthStateChanged((user) => {

				if(user != null) {

					user.updateProfile({
					  displayName: json.userName,
					  photoURL: json.userPic
					}).then(() => {
					  console.log('hoorrrayyy')
					}, (error) => {
					  // An error happened.
					});
				} else {
					console.log('error')
				}
			});

    		console.log(json, 'json')
	    			    	
	    }).catch((err) => {

	    	console.log(err, 'err');

	    });

	}


	logout () {
		Firebase.auth().currentUser.getToken(true).then(function(token) {
			console.log(token, ' token');
		});
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