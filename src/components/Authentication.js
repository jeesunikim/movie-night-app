import React from 'react';

class Autentication extends React.Component {
	constructor() {
		super();
		this.authenticate = this.authenticate.bind(this);
	}

	authenticate () {

		// let apiUrl = `https://slack.com/oauth/authorize`;
		let apiUrl = `https://slack.com/api/oauth.access`;

		fetch(apiUrl, {
			method: 'GET'
		}).then((res) => {
			console.log(res);
		});

	}

	render () {
		return (
		<div className="movie-night__authentication">
			<a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=3992851480.155742621031"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>
		</div>
		)
	}

};

export default Autentication;