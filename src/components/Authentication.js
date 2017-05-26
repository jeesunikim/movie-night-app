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

		console.log(this.state.uid, ' this.state.uid')


	}

	componentDidMount() {
		console.log('authenticate world');
		if(window.location.pathname === '/authenticated') {
			console.log('true');
			this.authenticate();
		};

		// Firebase.auth().onAuthStateChanged((user) => {
		// 	if(user) {
		// 		this.authenticate();
		// 	}else{
		// 		console.log('user does not exist', user)
		// 	}
		// });
	}

	authenticate () {
		console.log(' I am so authenticate');
		fetch('/api/users', {

			method: 'GET'
			
		}).then((res) => {

			return res.json();

		}).then((json) => {

			console.log(json, ' json')

			firebaseConfig.auth.signInWithCustomToken(json.firebaseToken).catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
			});

			firebaseConfig.auth.onAuthStateChanged((user) => {

				console.log('this causes is to call multiple times')

				if(user != null) {

					console.log(firebaseConfig.auth.currentUser, ' currentUser');

					//firebase.database().ref('user-posts/' + myUserId)
      
					user.updateProfile({
						uid: firebaseConfig.auth.currentUser.uid,
						displayName: json.userName,
						photoURL: json.userPic

					}).then(() => {

						this.setState({
							uid: firebaseConfig.auth.currentUser.uid
						});

						// const usersRef = firebaseConfig.database.ref('users/' + firebaseConfig.auth.currentUser.uid).push();
						// usersRef.set({
						// 	uid: firebaseConfig.auth.currentUser.uid,
						// 	displayName: json.userName,
						// 	photoURL: json.userPic
						// })


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
		firebaseConfig.auth.signOut().then(() =>{
			console.log('success');
			this.setState({ uid: null })
		})
	}

	renderLogin () {

		return (
			<nav className="login">
				<p>Sign in to vote or submit a movie</p>
				
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