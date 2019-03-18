const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const config = {
    apiKey: process.env.API_FIREBASE_KEY,
    authDomain: "fb-movie-night.firebaseapp.com",
    databaseURL: "https://fb-movie-night.firebaseio.com",
    projectId: "fb-movie-night",
    storageBucket: "fb-movie-night.appspot.com",
    messagingSenderId: "296065424169"
};

firebase.initializeApp(config);
const database = firebase.database();
const auth = firebase.auth();

module.exports = { firebase, auth, database, config };
