import React from 'react';
import Firebase from 'firebase';
import firebaseConfig from '../../firebase';

class Autentication extends React.Component {
	constructor() {
		super();
		this.authenticate = this.authenticate.bind(this);

		this.token = document.cookie.replace(/(?:(?:^|.*;\s*)customToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

		if(this.token.length > 1) {
			console.log(this.token, ' this.token')
		}

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