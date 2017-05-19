import React from 'react';
import Firebase from 'firebase';
import firebaseConfig from '../../firebase';

class Autentication extends React.Component {
	constructor() {
		super();
		this.authenticate = this.authenticate.bind(this);

		this.token = document.cookie.replace(/(?:(?:^|.*;\s*)customToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

		console.log(document.cookie, 'document.cookie')

		// console.log(JSON.stringify(slackAccessToken))

		// if(this.token.length > 1) {
			var tempApp = firebaseConfig.firebase.initializeApp(firebaseConfig.config, 'firstborn_users');
			console.log(this.token, ' this.token')
			tempApp.auth().signInWithCustomToken(this.token).then(user => {

				if (user != null) {
					name = user.displayName;
					email = user.email;
					photoUrl = user.photoURL;
					emailVerified = user.emailVerified;
					uid = user.uid;
				}

			}).catch((error) => {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  if (errorCode === 'auth/invalid-custom-token') {
			    console.log('The token you provided is not valid.');
			  } else {
			    console.error(error);
			  }
			});
		// }

		console.log(firebaseConfig, ' firebaseConfig');

		
	}

	authenticate () {

	}

	render () {
		return (
			<div onClick={this.authenticate}>hi</div>
		)
	}

};

export default Autentication;