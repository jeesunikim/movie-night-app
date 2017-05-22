const firebase = require('firebase');
require('dotenv').config();

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: "fb-movie-night.firebaseapp.com",
	databaseURL: "https://fb-movie-night.firebaseio.com",
	projectId: "fb-movie-night",
	storageBucket: "fb-movie-night.appspot.com",
	messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID
};

firebase.initializeApp(config);

let database = firebase.database();

module.exports = {
	config,
	database,
	firebase
}