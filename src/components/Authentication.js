import React from 'react';
import Firebase from 'firebase';
import firebaseConfig from '../../firebase';

class Autentication extends React.Component {

	constructor() {
		super();

		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
		this.renderLogin = this.renderLogin.bind(this);

		this.state = {
			uid: null
		}

		// let userName, userPhoto, userID;

		console.log(Firebase.auth(), ' Firebase.auth()');

		// Firebase.auth().onAuthStateChanged((user) => {
		// 	if (user) {
		// 		const user = Firebase.auth().currentUser;
		// 		console.log(user, ' user ');
		// 	} else {
		// 		console.log('onAuthStateChanged else')
		// 	}
		// });

	}

	componentDidMount() {
		Firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				console.log('user exists');
			}
		});


				// if(user !== null) {

					
	}
	authenticate () {
		console.log(' I am so authenticate');
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
						uid: json.userID,
						displayName: json.userName,
						photoURL: json.userPic

					}).then(() => {

						this.setState({
							uid: json.userID
						})

						console.log('user != null', this.state);

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
			this.setState({ uid: null })
		})
	}

	renderLogin () {
		return (
			<nav className="login">
				<p>Sign in to vote or submit a movie</p>
				<a onClick={this.authenticate}>login</a>
				<a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=3992851480.155742621031"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>
			</nav>
		)
	}

	render () {
		const logout = <button onClick={this.logout}>Log out!</button>

		// check if they are logged in
		if(!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}else{
			return <div>{logout}</div>
		}
	}

};

export default Autentication;