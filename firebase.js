const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyAU80pmT8LYBN5lelCa4uyzoLgAHEJH-5E",
  authDomain: "fb-movie-night.firebaseapp.com",
  databaseURL: "https://fb-movie-night.firebaseio.com"
};

firebase.initializeApp(config);

let database = firebase.database();

module.exports = {
	config,
	database,
	firebase
}