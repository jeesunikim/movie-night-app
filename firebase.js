const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyAU80pmT8LYBN5lelCa4uyzoLgAHEJH-5E",
  authDomain: "fb-movie-night.firebaseapp.com",
  databaseURL: "https://fb-movie-night.firebaseio.com",
  projectId: "fb-movie-night",
  storageBucket: "fb-movie-night.appspot.com",
  messagingSenderId: "296065424169"
};

const firebaseApp = firebase.initializeApp(config);
const database = firebaseApp.database();
const auth = firebaseApp.auth();

module.exports = {
  config,
  database,
  auth,
  firebaseApp
};
