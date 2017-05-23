const firebase = require('firebase');

const config = {
	apiKey: "AIzaSyAU80pmT8LYBN5lelCa4uyzoLgAHEJH-5E",
	authDomain: "fb-movie-night.firebaseapp.com",
	databaseURL: "https://fb-movie-night.firebaseio.com",
	projectId: "fb-movie-night",
	storageBucket: "fb-movie-night.appspot.com",
	messagingSenderId: "296065424169"
};

firebase.initializeApp(config);

let database = firebase.database();

module.exports = {
	config,
	database,
	firebase
}