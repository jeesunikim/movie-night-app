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
			uid: null,
			userName: null,
			userPhoto: null
		}

	}

	componentDidMount() {
		if(window.location.pathname === '/authenticated') {
			this.authenticate();
		}
	}

	componentWillUnmount() {
		firebaseConfig.auth.signOut().then(() =>{
			this.setState({ uid: null })
		})
	}

	authenticate () {
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

			const unsubscribe = firebaseConfig.auth.onAuthStateChanged((user) => {

				unsubscribe();

				if(user) {

					const userRef = firebaseConfig.database.ref("/users/" + firebaseConfig.auth.currentUser.uid);

					// userRef.push();

					userRef.set({
						username: json.userName,
						photoURL: json.userPic
					}).then(() =>{
						console.log('Synchronization succeeded');
					}).catch(() => {
						console.log('Synchronization failed');
					});	

					this.setState({
						uid: firebaseConfig.auth.currentUser.uid,
						userName: json.userName,
						userPhoto: json.userPic
					});
				};
			});		

		});
	}

	logout () {
		firebaseConfig.auth.signOut().then(() =>{
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
			return (
				<div className="MovieApp__authentication">
					<span>{this.renderLogin()}</span>
				</div>
			)
		}else{
			return (
				<div className="MovieApp__authentication">
					<span>Hello <strong>{this.state.userName}</strong></span>
					<img className="avatar_image" src={this.state.userPhoto} alt="user's slack picture" width="32px" height="32px" />
					{logout}
				</div>
			)
		}
	}

};

export default Autentication;